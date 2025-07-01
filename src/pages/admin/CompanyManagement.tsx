import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Building2,
  Users,
  Eye,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { Company, User, Trade } from '@/types';

const CompanyManagement: React.FC = () => {
  // Mock data
  const [companies] = useState<Company[]>([
    {
      company_id: 'acme-electrical',
      name: 'Acme Electrical Services',
      assigned_trades: ['electrical', 'solar'],
      status: 'active',
      created_by: 'admin_user',
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-06-01')
    },
    {
      company_id: 'solar-pro',
      name: 'Solar Pro Solutions',
      assigned_trades: ['solar'],
      status: 'active', 
      created_by: 'admin_user',
      created_at: new Date('2024-02-20'),
      updated_at: new Date('2024-05-15')
    },
    {
      company_id: 'quick-plumbing',
      name: 'Quick Plumbing Co.',
      assigned_trades: ['plumbing'],
      status: 'inactive',
      created_by: 'admin_user',
      created_at: new Date('2024-03-10'),
      updated_at: new Date('2024-04-05')
    }
  ]);

  const [users] = useState<User[]>([
    {
      uid: 'user1',
      email: 'john@acmeelectrical.com',
      name: 'John Smith',
      role: 'trade_company_user',
      company_id: 'acme-electrical',
      created_at: new Date('2024-01-16'),
      updated_at: new Date('2024-06-01')
    },
    {
      uid: 'user2',
      email: 'sarah@acmeelectrical.com',
      name: 'Sarah Johnson',
      role: 'trade_company_user',
      company_id: 'acme-electrical',
      created_at: new Date('2024-01-20'),
      updated_at: new Date('2024-05-20')
    },
    {
      uid: 'user3',
      email: 'mike@solarpro.com',
      name: 'Mike Wilson',
      role: 'trade_company_user',
      company_id: 'solar-pro',
      created_at: new Date('2024-02-21'),
      updated_at: new Date('2024-05-15')
    }
  ]);

  const [trades] = useState<Trade[]>([
    {
      trade_id: 'solar',
      name: 'Solar Installation',
      description: 'Solar panel installation and maintenance',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      trade_id: 'electrical',
      name: 'Electrical Services',
      description: 'General electrical work and repairs',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      trade_id: 'plumbing',
      name: 'Plumbing Services',
      description: 'Plumbing installation and repairs',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [isAssignUserOpen, setIsAssignUserOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCompanyUsers = (companyId: string) => {
    return users.filter(user => user.company_id === companyId);
  };

  const getTradeNames = (tradeIds: string[]) => {
    return tradeIds.map(id => {
      const trade = trades.find(t => t.trade_id === id);
      return trade ? trade.name : id;
    }).join(', ');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
          <p className="text-gray-600 mt-1">Manage companies and their trade assignments</p>
        </div>
        <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>Create a new company account on the platform</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="e.g., ABC Electrical Services" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assigned-trades">Assigned Trades</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trades for this company" />
                  </SelectTrigger>
                  <SelectContent>
                    {trades.map((trade) => (
                      <SelectItem key={trade.trade_id} value={trade.trade_id}>
                        {trade.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Select multiple trades by holding Ctrl/Cmd</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="company-active" defaultChecked />
                <Label htmlFor="company-active">Active</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddCompanyOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddCompanyOpen(false)}>Create Company</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-green-600 mt-1">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {companies.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {Math.round((companies.filter(c => c.status === 'active').length / companies.length) * 100)}% active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-green-600 mt-1">+5 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Users/Company</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(users.length / companies.length).toFixed(1)}
            </div>
            <p className="text-xs text-gray-600 mt-1">Per company</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="companies" className="space-y-6">
        <TabsList>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Companies
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Company Users
          </TabsTrigger>
        </TabsList>

        {/* Companies Tab */}
        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Company List</CardTitle>
              <CardDescription>Manage company accounts and their trade assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Assigned Trades</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => {
                      const companyUsers = getCompanyUsers(company.company_id);
                      return (
                        <TableRow key={company.company_id}>
                          <TableCell className="font-medium">{company.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {company.assigned_trades.map((tradeId) => {
                                const trade = trades.find(t => t.trade_id === tradeId);
                                return (
                                  <Badge key={tradeId} variant="outline" className="text-xs">
                                    {trade?.name || tradeId}
                                  </Badge>
                                );
                              })}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span>{companyUsers.length}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(company.status)}
                              <Badge variant={company.status === 'active' ? 'default' : 'secondary'}>
                                {company.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{company.created_at.toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedCompany(company);
                                  setIsAssignUserOpen(true);
                                }}
                              >
                                <Users className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Company Users</CardTitle>
                  <CardDescription>Manage user accounts within companies</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => {
                      const company = companies.find(c => c.company_id === user.company_id);
                      return (
                        <TableRow key={user.uid}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Building2 className="h-4 w-4 text-gray-400" />
                              <span>{company?.name || 'No Company'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {user.role === 'trade_company_user' ? 'Company User' : user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.created_at.toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assign User Dialog */}
      <Dialog open={isAssignUserOpen} onOpenChange={setIsAssignUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign User to Company</DialogTitle>
            <DialogDescription>
              {selectedCompany ? `Add a user to ${selectedCompany.name}` : 'Select a company first'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user-email">Email Address</Label>
              <Input id="user-email" placeholder="user@company.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-name">Full Name</Label>
              <Input id="user-name" placeholder="John Smith" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-role">Role</Label>
              <Select defaultValue="trade_company_user">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trade_company_user">Company User</SelectItem>
                  <SelectItem value="global_app_admin">Global Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="temp-password">Temporary Password</Label>
              <Input id="temp-password" type="password" placeholder="Generated automatically" />
              <p className="text-sm text-gray-500">User will be prompted to change on first login</p>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAssignUserOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAssignUserOpen(false)}>Create User</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyManagement;
