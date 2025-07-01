# Multi-Trade Quote Generation Hub

A comprehensive SaaS platform for managing multi-trade quote generation with role-based access, interactive quote builders, and external system integrations.

## 🚀 Live Demo

**Application URL:** https://srfnqtwu0m.space.minimax.io

### Demo Credentials

**Global Admin Access:**
- Email: `admin@quotehub.com`
- Password: `demo123`

**Trade Company User Access:**
- Email: `john@acmeelectrical.com`
- Password: `demo123`

## ✨ Features

### Global Admin Interface
- **Platform Dashboard** - Comprehensive platform statistics and monitoring
- **Trade Management** - Define trades, quote fields, and templates
- **Conversational Flow Builder** - Visual drag-and-drop interface for interactive quote collection
- **Company Management** - Create and manage trade companies with trade assignments
- **User Management** - Role-based user account management with bulk operations
- **Platform Settings** - Global configuration, security settings, and system monitoring

### Trade Company User Interface
- **Business Dashboard** - Company-specific metrics and quick actions
- **Business Settings** - Complete business information and system configuration
- **Products & Services** - Product catalog management with margin rules
- **Client Management** - Customer database with GoHighLevel integration
- **Quote Management** - Create, manage, and track quotes with status workflow
- **Integrations** - External system connections (GoHighLevel, Make.com, Google Sheets)

### Key Capabilities
- **Multi-Tenant Architecture** - Strict data segregation between companies
- **Role-Based Access Control** - Global Admin vs Trade Company User permissions
- **Interactive Quote Generation** - Conversational flows and standard forms
- **Margin Adjustment** - Real-time quote calculation with margin override
- **External Integrations** - CRM sync, automated export, and webhook support
- **Responsive Design** - Desktop and tablet optimized interfaces

## 🛠 Technology Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **UI Components:** Radix UI, Lucide React Icons
- **State Management:** React Context API, React Query
- **Routing:** React Router v6
- **Form Management:** React Hook Form with Zod validation
- **Drag & Drop:** React DnD for flow builder
- **Backend Ready:** Firebase/Firestore integration setup
- **Build Tool:** Vite
- **Package Manager:** pnpm

## 📁 Project Structure

```
quote-generation-hub/
├── src/
│   ├── components/
│   │   ├── admin/              # Admin-specific components
│   │   │   └── ConversationalFlowBuilder.tsx
│   │   ├── auth/               # Authentication components
│   │   ├── layout/             # Layout components
│   │   │   ├── AdminLayout.tsx
│   │   │   └── CompanyLayout.tsx
│   │   └── ui/                 # Reusable UI components
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── firebase.ts         # Firebase configuration
│   │   └── utils.ts           # Utility functions
│   ├── pages/
│   │   ├── admin/             # Global Admin pages
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── TradeManagement.tsx
│   │   │   ├── CompanyManagement.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   └── PlatformSettings.tsx
│   │   ├── auth/              # Authentication pages
│   │   │   └── Login.tsx
│   │   └── company/           # Trade Company User pages
│   │       ├── Dashboard.tsx
│   │       ├── BusinessSettings.tsx
│   │       ├── ProductsServices.tsx
│   │       ├── Clients.tsx
│   │       ├── Quotes.tsx
│   │       └── Integrations.tsx
│   ├── services/
│   │   ├── auth.service.ts     # Authentication service
│   │   └── firestore.service.ts # Firestore data services
│   └── types/
│       └── index.ts           # TypeScript type definitions
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- pnpm package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd quote-generation-hub

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Environment Variables
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎯 Key Features Implemented

### Authentication System
- Demo credentials for immediate testing
- Role-based routing and access control
- Persistent login sessions
- Secure logout functionality

### Global Admin Functionality
- **Trade Management:** Complete CRUD operations for trades, quote fields, and templates
- **Conversational Flow Builder:** Visual canvas with drag-and-drop nodes for creating interactive quote flows
- **Company Management:** Create companies, assign trades, manage users
- **User Management:** Bulk operations, role assignment, company association
- **Platform Settings:** Global configuration, security, integrations, and monitoring

### Trade Company User Functionality
- **Business Configuration:** Complete business setup with logo, terms, and system settings
- **Product Catalog:** Comprehensive product/service management with categories and margins
- **Client Management:** CRM integration with GoHighLevel sync capabilities
- **Quote Workflow:** Status-based quote management from draft to accepted
- **Integration Hub:** External system connections with webhook configuration

### Advanced Features
- **Responsive Design:** Optimized for desktop and tablet devices
- **Interactive UI:** Smooth transitions, loading states, and visual feedback
- **Data Validation:** Form validation with error handling
- **Mock Data:** Comprehensive demo data for testing all features
- **Export Functionality:** Quote export with external automation support

## 📊 Testing Results

The application has been thoroughly tested and verified:

✅ **Login System:** Both demo accounts work perfectly  
✅ **Navigation:** All routes and layouts function correctly  
✅ **Global Admin Interface:** All management features operational  
✅ **Company User Interface:** Complete business workflow functional  
✅ **Responsive Design:** Optimal display across device sizes  
✅ **Data Management:** CRUD operations work as expected  
✅ **Integration Features:** External system connection interfaces ready  

## 🔗 External Integration Support

### Supported Integrations
- **GoHighLevel:** Client sync and CRM integration
- **Make.com:** Quote export and automation workflows
- **Google Sheets:** Advanced rebate calculations and data export
- **Email Services:** Quote delivery and notifications
- **Webhooks:** Custom automation endpoints

### Integration Features
- OAuth flow preparation for GoHighLevel
- Webhook configuration for Make.com automation
- Service account setup for Google Sheets
- Email template configuration
- Real-time sync status monitoring

## 📈 Scalability & Architecture

### Multi-Tenant Design
- Strict data segregation between companies
- Role-based access control
- Scalable database structure
- Company-scoped data services

### Performance Optimizations
- Code splitting with dynamic imports
- Optimized bundle size
- Efficient state management
- Minimal re-renders with React optimization

### Security Features
- Role-based route protection
- Input validation and sanitization
- Secure authentication flow
- API key management system

## 🎨 Design System

### Color Palette
- **Primary:** Teal/Blue gradient scheme
- **Secondary:** Gray scale for backgrounds
- **Accent:** Green for success, Red for errors, Yellow for warnings
- **Professional:** Clean, minimalist aesthetic

### UI Principles
- **Consistency:** Unified component library
- **Accessibility:** Proper contrast and navigation
- **Responsiveness:** Mobile-first approach
- **Usability:** Intuitive workflows and clear feedback

## 📝 Documentation

### User Guides
- Global Admin workflow documentation
- Trade Company User operation manual
- Integration setup guides
- Troubleshooting documentation

### Technical Documentation
- API service documentation
- Component library reference
- Type definitions and interfaces
- Database schema documentation

## 🚀 Deployment

The application is configured for easy deployment:

- **Build Command:** `pnpm build`
- **Output Directory:** `dist/`
- **Environment:** Production-ready with optimizations
- **CDN Ready:** Static asset optimization

## 📞 Support

For questions, issues, or feature requests:
- Review the comprehensive demo at the live URL
- Test both user roles with provided credentials
- Explore all features and integrations
- Check the extensive UI/UX implementation

---

**Built with modern web technologies for enterprise-grade quote generation and business management.**
