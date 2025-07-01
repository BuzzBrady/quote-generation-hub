import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Download,
  Upload,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Client } from '@/types';
import toast from 'react-hot-toast';

const Clients: React.FC = () => {
  // Mock data for clients
  const [clients] = useState<Client[]>([
    {
      client_id: 'client-001',
      name: 'Smith Residence',
      email: 'john.smith@email.com',
      phone: '+61 7 1234 5678',
      address: '123 Main Street, Brisbane, QLD 4000',
      contact_person: 'John Smith',
      crm_id: 'GHL-001',
      notes: 'Regular customer, prefers morning appointments',
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-06-01')
    },
    {
      client_id: 'client-002',
      name: 'Johnson Commercial Building',
      email: 'sarah.johnson@johnsonprops.com',
      phone: '+61 7 2345 6789',
      address: '456 Business Blvd, Gold Coast, QLD 4217',
      contact_person: 'Sarah Johnson',
      crm_id: 'GHL-002',
      notes: 'Commercial property manager, bulk electrical work',
      created_at: new Date('2024-02-20'),
      updated_at: new Date('2024-05-15')
    },
    {
      client_id: 'client-003',
      name: 'Wilson Family Home',
      email: 'mike.wilson@email.com',
      phone: '+61 7 3456 7890',
      address: '789 Elm Street, Toowoomba, QLD 4350',
      contact_person: 'Mike Wilson',
      notes: 'New construction, solar panel installation required',
      created_at: new Date('2024-03-10'),
      updated_at: new Date('2024-04-20')
    },
    {
      client_id: 'client-004',
      name: 'Brown Apartments',
      email: 'lisa.brown@brownproperties.com',
      phone: '+61 7 4567 8901',
      address: '321 Oak Avenue, Cairns, QLD 4870',
      contact_person: 'Lisa Brown',
      crm_id: 'GHL-003',
      notes: 'Multi-unit property, requires safety inspections',
      created_at: new Date('2024-04-05'),
      updated_at: new Date('2024-05-30')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isGoHighLevelConnected, setIsGoHighLevelConnected] = useState(true);
  const [lastSyncTime] = useState(new Date('2024-06-01T10:30:00'));

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getQuoteCount = (clientId: string) => {
    // Mock quote counts
    const quoteCounts: Record<string, number> = {
      'client-001': 3,
      'client-002': 7,
      'client-003': 1,
      'client-004': 4
    };
    return quoteCounts[clientId] || 0;
  };

  const getLastQuoteDate = (clientId: string) => {
    // Mock last quote dates
    const lastQuotes: Record<string, Date> = {
      'client-001': new Date('2024-05-20'),
      'client-002': new Date('2024-05-28'),
      'client-003': new Date('2024-05-10'),
      'client-004': new Date('2024-05-25')
    };
    return lastQuotes[clientId];
  };

  const handleSyncGoHighLevel = async () => {
    try {
      toast.loading('Syncing clients from GoHighLevel...', { duration: 2000 });
      // In a real implementation, this would call the GHL API
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Successfully synced 5 clients from GoHighLevel');
    } catch (error) {
      toast.error('Failed to sync from GoHighLevel');
    }
  };

  const handleConnectGoHighLevel = () => {
    // In a real implementation, this would initiate OAuth flow
    toast.success('Redirecting to GoHighLevel OAuth...');
    setIsGoHighLevelConnected(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage your customer database and contact information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>Add a new client to your database</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="client-name">Client Name *</Label>
                  <Input id="client-name" placeholder="e.g., Smith Residence" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" placeholder="e.g., John Smith" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="client-email">Email Address</Label>
                    <Input id="client-email" type="email" placeholder="john.smith@email.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client-phone">Phone Number</Label>
                    <Input id="client-phone" placeholder="+61 7 1234 5678" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-address">Address *</Label>
                  <Textarea id="client-address" placeholder="Full address including suburb, state, and postcode" rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-notes">Notes</Label>
                  <Textarea id="client-notes" placeholder="Any additional notes about this client" rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="crm-id">CRM ID (GoHighLevel)</Label>
                  <Input id="crm-id" placeholder="Optional - for linked CRM records" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddClientOpen(false)}>Add Client</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-green-600 mt-1">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600 mt-1">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CRM Synced</CardTitle>
            <RefreshCw className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.filter(c => c.crm_id).length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Linked to GoHighLevel</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Projects</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-gray-600 mt-1">Per client</p>
          </CardContent>
        </Card>
      </div>

      {/* GoHighLevel Integration Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                GoHighLevel Integration
              </CardTitle>
              <CardDescription>Sync clients from your CRM system</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isGoHighLevelConnected ? "default" : "secondary"}>
                {isGoHighLevelConnected ? "Connected" : "Disconnected"}
              </Badge>
              {isGoHighLevelConnected ? (
                <Button onClick={handleSyncGoHighLevel}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              ) : (
                <Button onClick={handleConnectGoHighLevel}>
                  Connect to GoHighLevel
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {clients.filter(c => c.crm_id).length}
              </div>
              <p className="text-sm text-green-700">Synced Clients</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {lastSyncTime.toLocaleDateString()}
              </div>
              <p className="text-sm text-blue-700">Last Sync</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Auto</div>
              <p className="text-sm text-purple-700">Sync Mode</p>
            </div>
          </div>
          {isGoHighLevelConnected && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Connected to GHL Location:</strong> Acme Electrical Services<br />
                <strong>Last Synced:</strong> {lastSyncTime.toLocaleString()}<br />
                <strong>Note:</strong> Client data is pulled from GoHighLevel. Changes here will not sync back automatically.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Client Database</CardTitle>
              <CardDescription>Manage your customer contact information</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search clients by name, email, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Quotes</TableHead>
                  <TableHead>Last Quote</TableHead>
                  <TableHead>CRM</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => {
                  const quoteCount = getQuoteCount(client.client_id);
                  const lastQuote = getLastQuoteDate(client.client_id);
                  
                  return (
                    <TableRow key={client.client_id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          {client.contact_person && (
                            <div className="text-sm text-gray-500">{client.contact_person}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {client.email && (
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {client.email}
                            </div>
                          )}
                          {client.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {client.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start text-sm">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="max-w-xs truncate">{client.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{quoteCount}</div>
                          <div className="text-xs text-gray-500">quotes</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {lastQuote ? (
                          <div className="text-sm">
                            <div>{lastQuote.toLocaleDateString()}</div>
                            <div className="text-gray-500 text-xs">
                              {Math.floor((Date.now() - lastQuote.getTime()) / (1000 * 60 * 60 * 24))} days ago
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No quotes</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {client.crm_id ? (
                          <Badge variant="outline" className="text-xs">
                            {client.crm_id}
                          </Badge>
                        ) : (
                          <span className="text-gray-400 text-sm">Not synced</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" title="View Client">
                            <Users className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Create Quote">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Edit Client">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Delete Client">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredClients.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No clients found matching your search</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Client Activity</CardTitle>
          <CardDescription>Latest updates and interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                client: 'Smith Residence', 
                action: 'Quote created', 
                details: 'QTE-000125 - Electrical panel upgrade',
                time: '2 hours ago' 
              },
              { 
                client: 'Johnson Commercial Building', 
                action: 'Client updated', 
                details: 'Contact information modified',
                time: '4 hours ago' 
              },
              { 
                client: 'Wilson Family Home', 
                action: 'Quote accepted', 
                details: 'QTE-000124 - Solar installation project',
                time: '1 day ago' 
              },
              { 
                client: 'Brown Apartments', 
                action: 'New client added', 
                details: 'Synced from GoHighLevel',
                time: '2 days ago' 
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start justify-between py-2 border-b last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.client}</p>
                    <p className="text-xs text-gray-500">{activity.details}</p>
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

export default Clients;
