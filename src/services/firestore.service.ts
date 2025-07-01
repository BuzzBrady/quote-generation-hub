import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  Trade, 
  QuoteField, 
  TradeTemplate, 
  Company, 
  User, 
  Client, 
  ProductService, 
  Quote,
  BusinessSettings,
  SystemSettings,
  MarginRules,
  Rebate,
  ConversationalFlow
} from '@/types';

// Base service class with common CRUD operations
export class BaseFirestoreService<T> {
  constructor(private collectionName: string) {}

  async getAll(): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as T[];
  }

  async getById(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updated_at: serverTimestamp()
    });
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async getWhere(field: string, operator: any, value: any): Promise<T[]> {
    const q = query(collection(db, this.collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as T[];
  }

  subscribe(callback: (data: T[]) => void): () => void {
    const q = query(collection(db, this.collectionName), orderBy('created_at', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as T[];
      callback(data);
    });
  }
}

// Trade Service
export class TradeService extends BaseFirestoreService<Trade> {
  constructor() {
    super('trades');
  }

  async getActiveTrades(): Promise<Trade[]> {
    return this.getWhere('is_active', '==', true);
  }

  async getQuoteFields(tradeId: string): Promise<QuoteField[]> {
    const q = query(
      collection(db, `trades/${tradeId}/quoteFields`),
      orderBy('category'),
      orderBy('name')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      field_id: doc.id, 
      ...doc.data() 
    })) as QuoteField[];
  }

  async addQuoteField(tradeId: string, field: Omit<QuoteField, 'field_id' | 'created_at' | 'updated_at'>): Promise<string> {
    const docRef = await addDoc(collection(db, `trades/${tradeId}/quoteFields`), {
      ...field,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  }

  async getTemplates(tradeId: string): Promise<TradeTemplate[]> {
    const q = query(
      collection(db, `trades/${tradeId}/templates`),
      where('is_active', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      template_id: doc.id, 
      ...doc.data() 
    })) as TradeTemplate[];
  }

  async addTemplate(tradeId: string, template: Omit<TradeTemplate, 'template_id' | 'created_at' | 'updated_at'>): Promise<string> {
    const docRef = await addDoc(collection(db, `trades/${tradeId}/templates`), {
      ...template,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  }
}

// Company Service  
export class CompanyService extends BaseFirestoreService<Company> {
  constructor() {
    super('companies');
  }

  async getByUserId(userId: string): Promise<Company | null> {
    const companies = await this.getWhere('users', 'array-contains', userId);
    return companies[0] || null;
  }

  async getActiveCompanies(): Promise<Company[]> {
    return this.getWhere('status', '==', 'active');
  }

  async assignTrades(companyId: string, tradeIds: string[]): Promise<void> {
    await this.update(companyId, { assigned_trades: tradeIds });
  }

  async getBusinessSettings(companyId: string): Promise<BusinessSettings | null> {
    const docRef = doc(db, `companies/${companyId}/settings/business`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as BusinessSettings;
    }
    return null;
  }

  async updateBusinessSettings(companyId: string, settings: BusinessSettings): Promise<void> {
    const docRef = doc(db, `companies/${companyId}/settings/business`);
    await updateDoc(docRef, {
      ...settings,
      updated_at: serverTimestamp()
    });
  }

  async getSystemSettings(companyId: string): Promise<SystemSettings | null> {
    const docRef = doc(db, `companies/${companyId}/settings/system`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as SystemSettings;
    }
    return null;
  }

  async updateSystemSettings(companyId: string, settings: SystemSettings): Promise<void> {
    const docRef = doc(db, `companies/${companyId}/settings/system`);
    await updateDoc(docRef, {
      ...settings,
      updated_at: serverTimestamp()
    });
  }
}

// User Service
export class UserService extends BaseFirestoreService<User> {
  constructor() {
    super('users');
  }

  async getByEmail(email: string): Promise<User | null> {
    const users = await this.getWhere('email', '==', email);
    return users[0] || null;
  }

  async getByCompany(companyId: string): Promise<User[]> {
    return this.getWhere('company_id', '==', companyId);
  }

  async getGlobalAdmins(): Promise<User[]> {
    return this.getWhere('role', '==', 'global_app_admin');
  }

  async createWithAuth(email: string, name: string, role: string, companyId?: string): Promise<string> {
    // In a real implementation, this would also create the Firebase Auth user
    const uid = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return this.create({
      uid,
      email,
      name,
      role: role as 'global_app_admin' | 'trade_company_user',
      company_id: companyId
    });
  }
}

// Client Service (Company-scoped)
export class ClientService {
  constructor(private companyId: string) {}

  private get collectionPath() {
    return `companies/${this.companyId}/clients`;
  }

  async getAll(): Promise<Client[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionPath));
    return querySnapshot.docs.map(doc => ({ 
      client_id: doc.id, 
      ...doc.data() 
    })) as Client[];
  }

  async getById(clientId: string): Promise<Client | null> {
    const docRef = doc(db, this.collectionPath, clientId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { client_id: docSnap.id, ...docSnap.data() } as Client;
    }
    return null;
  }

  async create(client: Omit<Client, 'client_id' | 'created_at' | 'updated_at'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionPath), {
      ...client,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  }

  async update(clientId: string, client: Partial<Client>): Promise<void> {
    const docRef = doc(db, this.collectionPath, clientId);
    await updateDoc(docRef, {
      ...client,
      updated_at: serverTimestamp()
    });
  }

  async delete(clientId: string): Promise<void> {
    const docRef = doc(db, this.collectionPath, clientId);
    await deleteDoc(docRef);
  }

  async search(searchTerm: string): Promise<Client[]> {
    // In a real implementation, you'd use full-text search
    const clients = await this.getAll();
    return clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

// Product/Service Management (Company-scoped)
export class ProductServiceService {
  constructor(private companyId: string) {}

  private get collectionPath() {
    return `companies/${this.companyId}/productsServices`;
  }

  async getAll(): Promise<ProductService[]> {
    const q = query(collection(db, this.collectionPath), orderBy('category'), orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      product_id: doc.id, 
      ...doc.data() 
    })) as ProductService[];
  }

  async getByCategory(category: string): Promise<ProductService[]> {
    const q = query(
      collection(db, this.collectionPath), 
      where('category', '==', category),
      where('is_active', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      product_id: doc.id, 
      ...doc.data() 
    })) as ProductService[];
  }

  async create(product: Omit<ProductService, 'product_id' | 'created_at' | 'updated_at'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionPath), {
      ...product,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  }

  async update(productId: string, product: Partial<ProductService>): Promise<void> {
    const docRef = doc(db, this.collectionPath, productId);
    await updateDoc(docRef, {
      ...product,
      updated_at: serverTimestamp()
    });
  }

  async delete(productId: string): Promise<void> {
    const docRef = doc(db, this.collectionPath, productId);
    await deleteDoc(docRef);
  }

  async getMarginRules(): Promise<MarginRules | null> {
    const docRef = doc(db, `companies/${this.companyId}/settings/marginRules`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as MarginRules;
    }
    return null;
  }

  async updateMarginRules(rules: MarginRules): Promise<void> {
    const docRef = doc(db, `companies/${this.companyId}/settings/marginRules`);
    await updateDoc(docRef, {
      ...rules,
      updated_at: serverTimestamp()
    });
  }
}

// Quote Service (Company-scoped)
export class QuoteService {
  constructor(private companyId: string) {}

  private get collectionPath() {
    return `companies/${this.companyId}/quotes`;
  }

  async getAll(): Promise<Quote[]> {
    const q = query(collection(db, this.collectionPath), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      quote_id: doc.id, 
      ...doc.data() 
    })) as Quote[];
  }

  async getByStatus(status: Quote['status']): Promise<Quote[]> {
    const q = query(
      collection(db, this.collectionPath), 
      where('status', '==', status),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      quote_id: doc.id, 
      ...doc.data() 
    })) as Quote[];
  }

  async create(quote: Omit<Quote, 'quote_id' | 'created_at' | 'updated_at'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionPath), {
      ...quote,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  }

  async update(quoteId: string, quote: Partial<Quote>): Promise<void> {
    const docRef = doc(db, this.collectionPath, quoteId);
    await updateDoc(docRef, {
      ...quote,
      updated_at: serverTimestamp()
    });
  }

  async delete(quoteId: string): Promise<void> {
    const docRef = doc(db, this.collectionPath, quoteId);
    await deleteDoc(docRef);
  }

  async generateQuoteNumber(): Promise<string> {
    // Get the company's system settings for quote number prefix
    const settingsRef = doc(db, `companies/${this.companyId}/settings/system`);
    const settingsSnap = await getDoc(settingsRef);
    
    let prefix = 'QTE-';
    let nextNumber = 1;
    
    if (settingsSnap.exists()) {
      const settings = settingsSnap.data() as SystemSettings;
      prefix = settings.quote_number_prefix;
      nextNumber = settings.next_quote_number;
    }
    
    // Update the next quote number
    await updateDoc(settingsRef, {
      next_quote_number: nextNumber + 1,
      updated_at: serverTimestamp()
    });
    
    return `${prefix}${String(nextNumber).padStart(6, '0')}`;
  }
}

// Rebate Service (Company-scoped)
export class RebateService {
  constructor(private companyId: string) {}

  private get collectionPath() {
    return `companies/${this.companyId}/rebates`;
  }

  async getAll(): Promise<Rebate[]> {
    const q = query(collection(db, this.collectionPath), where('is_active', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      rebate_id: doc.id, 
      ...doc.data() 
    })) as Rebate[];
  }

  async create(rebate: Omit<Rebate, 'rebate_id' | 'created_at' | 'updated_at'>): Promise<string> {
    const docRef = await addDoc(collection(db, this.collectionPath), {
      ...rebate,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return docRef.id;
  }

  async update(rebateId: string, rebate: Partial<Rebate>): Promise<void> {
    const docRef = doc(db, this.collectionPath, rebateId);
    await updateDoc(docRef, {
      ...rebate,
      updated_at: serverTimestamp()
    });
  }
}

// Data seeding service for demo purposes
export class DataSeedService {
  async seedInitialData(): Promise<void> {
    const batch = writeBatch(db);

    // Create demo trades
    const solarTradeRef = doc(collection(db, 'trades'));
    batch.set(solarTradeRef, {
      trade_id: 'solar',
      name: 'Solar Installation',
      description: 'Solar panel installation and maintenance services',
      is_active: true,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    const electricalTradeRef = doc(collection(db, 'trades'));
    batch.set(electricalTradeRef, {
      trade_id: 'electrical',
      name: 'Electrical Services',
      description: 'General electrical work and repairs',
      is_active: true,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    // Create demo companies
    const acmeCompanyRef = doc(collection(db, 'companies'));
    batch.set(acmeCompanyRef, {
      company_id: 'acme-electrical',
      name: 'Acme Electrical Services',
      assigned_trades: ['electrical', 'solar'],
      status: 'active',
      created_by: 'admin',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    // Create demo users
    const adminUserRef = doc(collection(db, 'users'));
    batch.set(adminUserRef, {
      uid: 'demo-admin',
      email: 'admin@quotehub.com',
      name: 'Global Admin',
      role: 'global_app_admin',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    const companyUserRef = doc(collection(db, 'users'));
    batch.set(companyUserRef, {
      uid: 'demo-company-user',
      email: 'john@acmeelectrical.com',
      name: 'John Smith',
      role: 'trade_company_user',
      company_id: 'acme-electrical',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });

    await batch.commit();
  }
}

// Service factory
export const createTradeService = () => new TradeService();
export const createCompanyService = () => new CompanyService();
export const createUserService = () => new UserService();
export const createClientService = (companyId: string) => new ClientService(companyId);
export const createProductServiceService = (companyId: string) => new ProductServiceService(companyId);
export const createQuoteService = (companyId: string) => new QuoteService(companyId);
export const createRebateService = (companyId: string) => new RebateService(companyId);
export const createDataSeedService = () => new DataSeedService();
