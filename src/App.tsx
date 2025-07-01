import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Link,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import CompanyLayout from '@/components/layout/CompanyLayout';
import Login from '@/pages/auth/Login';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import TradeManagement from '@/pages/admin/TradeManagement';
import CompanyManagement from '@/pages/admin/CompanyManagement';
import UserManagement from '@/pages/admin/UserManagement';
import PlatformSettings from '@/pages/admin/PlatformSettings';
import Dashboard from '@/pages/company/Dashboard';
import BusinessSettings from '@/pages/company/BusinessSettings';
import ProductsServices from '@/pages/company/ProductsServices';
import Clients from '@/pages/company/Clients';
import Quotes from '@/pages/company/Quotes';
import Integrations from '@/pages/company/Integrations';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// A simple component to render for 404 Not Found pages
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Go to Homepage
      </Link>
    </div>
  );
}

// Define routes using the data router API
const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <Login />,
  },
  // Global Admin routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="global_app_admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    // Admin child routes render inside AdminLayout's <Outlet />
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'trades', element: <TradeManagement /> },
      { path: 'companies', element: <CompanyManagement /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'settings', element: <PlatformSettings /> },
      // Catch-all route for any undefined /admin paths
      { path: '*', element: <NotFound /> },
    ],
  },
  // Trade Company User routes
  {
    path: '/',
    element: (
      <ProtectedRoute requiredRole="trade_company_user">
        <CompanyLayout />
      </ProtectedRoute>
    ),
    // Company child routes render inside CompanyLayout's <Outlet />
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'business-settings', element: <BusinessSettings /> },
      { path: 'products-services', element: <ProductsServices /> },
      { path: 'clients', element: <Clients /> },
      { path: 'quotes', element: <Quotes /> },
      { path: 'integrations', element: <Integrations /> },
    ],
  },
  // Catch-all route for top-level 404 Not Found errors
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* The RouterProvider component now renders your routes */}
        <RouterProvider router={router} />

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
