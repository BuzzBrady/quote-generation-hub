import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithDemo: (userType: 'admin' | 'company') => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  isGlobalAdmin: boolean;
  isTradeCompanyUser: boolean;
  getDemoCredentials: () => { admin: { email: string; password: string }; company: { email: string; password: string } };
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (firebaseUser: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        setUser({
          ...userData,
          created_at: userData.created_at instanceof Date ? userData.created_at : new Date(userData.created_at),
          updated_at: userData.updated_at instanceof Date ? userData.updated_at : new Date(userData.updated_at)
        });
      } else {
        // Create a default user profile if it doesn't exist
        const defaultUser: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          role: 'trade_company_user',
          created_at: new Date(),
          updated_at: new Date()
        };
        await setDoc(doc(db, 'users', firebaseUser.uid), defaultUser);
        setUser(defaultUser);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Error loading user profile');
    }
  };

  useEffect(() => {
    // Check for stored demo user first
    const checkDemoUser = () => {
      try {
        const storedUser = localStorage.getItem('demo_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error checking stored demo user:', error);
      }
      
      // For production Firebase (commented out for demo):
      // const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      //   setFirebaseUser(firebaseUser);
      //   if (firebaseUser) {
      //     await fetchUserProfile(firebaseUser);
      //   } else {
      //     setUser(null);
      //   }
      //   setLoading(false);
      // });
      // return unsubscribe;
      
      setLoading(false);
    };

    checkDemoUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Demo credentials for testing
      if (email === 'admin@quotehub.com' && password === 'demo123') {
        const demoAdmin: User = {
          uid: 'demo-admin-123',
          email: 'admin@quotehub.com',
          name: 'Global Admin',
          role: 'global_app_admin',
          created_at: new Date(),
          updated_at: new Date()
        };
        setUser(demoAdmin);
        localStorage.setItem('demo_user', JSON.stringify(demoAdmin));
        toast.success('Successfully logged in as Global Admin');
        return;
      }
      
      if (email === 'john@acmeelectrical.com' && password === 'demo123') {
        const demoUser: User = {
          uid: 'demo-user-456',
          email: 'john@acmeelectrical.com',
          name: 'John Smith',
          role: 'trade_company_user',
          company_id: 'acme-electrical',
          created_at: new Date(),
          updated_at: new Date()
        };
        setUser(demoUser);
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        toast.success('Successfully logged in as Company User');
        return;
      }
      
      // For production Firebase (commented out for demo):
      // await signInWithEmailAndPassword(auth, email, password);
      // toast.success('Successfully logged in');
      
      toast.error('Invalid credentials. Use demo accounts:\n- admin@quotehub.com\n- john@acmeelectrical.com\nPassword: demo123');
      throw new Error('Invalid demo credentials');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to log in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setLoading(true);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || email,
        name: userData.name || email.split('@')[0],
        role: userData.role || 'trade_company_user',
        company_id: userData.company_id,
        created_at: new Date(),
        updated_at: new Date()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      setUser(newUser);
      toast.success('Account created successfully');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithDemo = async (userType: 'admin' | 'company') => {
    try {
      setLoading(true);
      
      const demoUsers = {
        admin: {
          uid: 'demo-admin-123',
          email: 'admin@quotehub.com',
          name: 'Global Admin',
          role: 'global_app_admin' as const,
          created_at: new Date(),
          updated_at: new Date()
        },
        company: {
          uid: 'demo-user-456',
          email: 'john@acmeelectrical.com',
          name: 'John Smith',
          role: 'trade_company_user' as const,
          company_id: 'acme-electrical',
          created_at: new Date(),
          updated_at: new Date()
        }
      };
      
      const user = demoUsers[userType];
      setUser(user);
      localStorage.setItem('demo_user', JSON.stringify(user));
      toast.success(`Successfully logged in as ${userType === 'admin' ? 'Global Admin' : 'Company User'}`);
    } catch (error: any) {
      console.error('Demo login error:', error);
      toast.error('Failed to log in with demo credentials');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // For production Firebase:
      // await signOut(auth);
      // setFirebaseUser(null);
      
      setUser(null);
      localStorage.removeItem('demo_user');
      toast.success('Successfully logged out');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
      throw error;
    }
  };

  const getDemoCredentials = () => {
    return {
      admin: { email: 'admin@quotehub.com', password: 'demo123' },
      company: { email: 'john@acmeelectrical.com', password: 'demo123' }
    };
  };

  const isGlobalAdmin = user?.role === 'global_app_admin';
  const isTradeCompanyUser = user?.role === 'trade_company_user';

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    login,
    loginWithDemo,
    logout,
    register,
    isGlobalAdmin,
    isTradeCompanyUser,
    getDemoCredentials
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
