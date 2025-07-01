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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Users,
  Shield,
  Eye,
  Mail,
  Building2,
  Crown,
  UserCheck,
  UserX,
  MoreHorizontal,
  Download,
  Upload
} from 'lucide-react';
import { User, Company } from '@/types';

const UserManagement: React.FC = () => {
  // Mock data
  const [users] = useState<User[]>([
    {
      uid: 'admin1',
      email: 'admin@quotehub.com',
      name: 'Admin User',
      role: 'global_app_admin',
      created_at: new Date('2024-01-01'),
      updated_at: new Date('2024-06-01')
    },
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
    },
    {
      uid: 'user4',
      email: 'lisa@quickplumbing.com',
      name: 'Lisa Brown',
      role: 'trade_company_user',
      company_id: 'quick-plumbing',
      created_at: new Date('2024-03-11'),
      updated_at: new Date('2024-04-05')
    }
  ]);

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

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesCompany = 
      companyFilter === 'all' || 
      (companyFilter === 'none' && !user.company_id) ||
      user.company_id === companyFilter;
    return matchesSearch && matchesRole && matchesCompany;
  });

  const getCompanyName = (companyId?: string) => {
    if (!companyId) return 'No Company';
    const company = companies.find(c => c.company_id === companyId);
    return company?.name || 'Unknown Company';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'global_app_admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'trade_company_user':
        return <UserCheck className="h-4 w-4 text-blue-500" />;
      default:
        return <UserX className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'global_app_admin':
        return 'default' as const;
      case 'trade_company_user':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.uid));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions across the platform</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Users
          </Button>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account for the platform</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="user-email">Email Address</Label>
                  <Input id="user-email" type="email" placeholder="user@company.com" />
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
                      <SelectItem value="trade_company_user">Trade Company User</SelectItem>
                      <SelectItem value="global_app_admin">Global App Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-company">Company</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Company</SelectItem>
                      {companies.map((company) => (
                        <SelectItem key={company.company_id} value={company.company_id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Required for Trade Company Users</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="temp-password">Temporary Password</Label>
                  <Input id="temp-password" type="password" placeholder="Auto-generated secure password" />
                  <p className="text-sm text-gray-500">User will be required to change on first login</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="send-email" defaultChecked />
                  <Label htmlFor="send-email">Send welcome email with login instructions</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddUserOpen(false)}>Create User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-green-600 mt-1">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Admins</CardTitle>
            <Crown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === 'global_app_admin').length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Admin accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === 'trade_company_user').length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Active company users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-green-600 mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main User Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>Manage all user accounts across the platform</CardDescription>
            </div>
            {selectedUsers.length > 0 && (
              <Dialog open={isBulkActionOpen} onOpenChange={setIsBulkActionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    Bulk Actions ({selectedUsers.length})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bulk Actions</DialogTitle>
                    <DialogDescription>
                      Perform actions on {selectedUsers.length} selected user{selectedUsers.length !== 1 ? 's' : ''}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Password Reset Email
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Change Role
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Building2 className="h-4 w-4 mr-2" />
                      Reassign Company
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Selected Users
                    </Button>
                    <Button className="w-full justify-start" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected Users
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="global_app_admin">Global Admin</SelectItem>
                  <SelectItem value="trade_company_user">Company User</SelectItem>
                </SelectContent>
              </Select>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="none">No Company</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company.company_id} value={company.company_id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* User Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.uid)}
                        onCheckedChange={() => handleSelectUser(user.uid)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(user.role)}
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role === 'global_app_admin' ? 'Global Admin' : 'Company User'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{getCompanyName(user.company_id)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {user.created_at.toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {user.updated_at.toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" title="View User">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Send Email">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit User">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete User">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No users found matching your criteria</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
          <CardDescription>Latest user management events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'User created', user: 'mike@solarpro.com', time: '2 hours ago' },
              { action: 'Role changed', user: 'sarah@acmeelectrical.com', time: '4 hours ago' },
              { action: 'Password reset', user: 'john@acmeelectrical.com', time: '1 day ago' },
              { action: 'Company assigned', user: 'lisa@quickplumbing.com', time: '2 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
