import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@quotehub.com',
    password: 'demo123',
    user: {
      uid: 'demo-admin-123',
      email: 'admin@quotehub.com',
      name: 'Global Admin',
      role: 'global_app_admin' as const,
      created_at: new Date(),
      updated_at: new Date()
    }
  },
  company: {
    email: 'john@acmeelectrical.com',
    password: 'demo123',
    user: {
      uid: 'demo-user-456',
      email: 'john@acmeelectrical.com',
      name: 'John Smith',
      role: 'trade_company_user' as const,
      company_id: 'acme-electrical',
      created_at: new Date(),
      updated_at: new Date()
    }
  }
};

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    try {
      // Check demo credentials first
      if (email === DEMO_CREDENTIALS.admin.email && password === DEMO_CREDENTIALS.admin.password) {
        return DEMO_CREDENTIALS.admin.user;
      }
      
      if (email === DEMO_CREDENTIALS.company.email && password === DEMO_CREDENTIALS.company.password) {
        return DEMO_CREDENTIALS.company.user;
      }

      // For production with real Firebase:
      // const result = await signInWithEmailAndPassword(auth, email, password);
      // const userProfile = await AuthService.getUserProfile(result.user.uid);
      // if (!userProfile) throw new Error('User profile not found');
      // return userProfile;
      
      throw new Error('Invalid credentials. Use demo accounts: admin@quotehub.com or john@acmeelectrical.com with password: demo123');
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  }

  static async loginWithDemo(userType: 'admin' | 'company'): Promise<User> {
    const credentials = DEMO_CREDENTIALS[userType];
    return this.login(credentials.email, credentials.password);
  }

  static async register(
    email: string, 
    password: string, 
    userData: Omit<User, 'uid' | 'created_at' | 'updated_at'>
  ): Promise<User> {
    try {
      // For production Firebase:
      // const result = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(result.user, { displayName: userData.name });
      // 
      // const user: User = {
      //   uid: result.user.uid,
      //   email: result.user.email || email,
      //   ...userData,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // };
      //
      // await setDoc(doc(db, 'users', result.user.uid), user);
      // return user;

      // For demo purposes
      return {
        uid: 'new-user-' + Date.now(),
        email,
        ...userData,
        created_at: new Date(),
        updated_at: new Date()
      };
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  static async logout(): Promise<void> {
    // For production: await signOut(auth);
    // For demo, just resolve
    return Promise.resolve();
  }

  static async getCurrentUser(): Promise<User | null> {
    // For demo purposes, return null (user will need to log in)
    return null;
    
    // For production Firebase:
    // return new Promise((resolve) => {
    //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    //     unsubscribe();
    //     if (firebaseUser) {
    //       const userProfile = await AuthService.getUserProfile(firebaseUser.uid);
    //       resolve(userProfile);
    //     } else {
    //       resolve(null);
    //     }
    //   });
    // });
  }

  static async getUserProfile(uid: string): Promise<User | null> {
    try {
      // Check if it's a demo user
      if (uid === DEMO_CREDENTIALS.admin.user.uid) {
        return DEMO_CREDENTIALS.admin.user;
      }
      if (uid === DEMO_CREDENTIALS.company.user.uid) {
        return DEMO_CREDENTIALS.company.user;
      }

      // For production Firebase:
      // const userDoc = await getDoc(doc(db, 'users', uid));
      // if (userDoc.exists()) {
      //   const data = userDoc.data() as User;
      //   return {
      //     ...data,
      //     created_at: data.created_at instanceof Date ? data.created_at : new Date(data.created_at),
      //     updated_at: data.updated_at instanceof Date ? data.updated_at : new Date(data.updated_at)
      //   };
      // }
      
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  static async updateUserProfile(uid: string, updates: Partial<User>): Promise<void> {
    // For production Firebase:
    // const updateData = {
    //   ...updates,
    //   updated_at: new Date()
    // };
    // await setDoc(doc(db, 'users', uid), updateData, { merge: true });
    
    // For demo, just resolve
    return Promise.resolve();
  }

  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    // For demo purposes, return a no-op unsubscribe function
    return () => {};
    
    // For production Firebase:
    // return onAuthStateChanged(auth, async (firebaseUser) => {
    //   if (firebaseUser) {
    //     const userProfile = await AuthService.getUserProfile(firebaseUser.uid);
    //     callback(userProfile);
    //   } else {
    //     callback(null);
    //   }
    // });
  }

  static getDemoCredentials() {
    return {
      admin: { email: DEMO_CREDENTIALS.admin.email, password: DEMO_CREDENTIALS.admin.password },
      company: { email: DEMO_CREDENTIALS.company.email, password: DEMO_CREDENTIALS.company.password }
    };
  }
}
