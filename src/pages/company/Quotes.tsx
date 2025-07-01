import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Eye,
  Download,
  Calendar,
  User,
  MapPin,
  Calculator
} from 'lucide-react';
import { Quote, Client, Trade, TradeTemplate } from '@/types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Quotes: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for quotes
  const [quotes] = useState<Quote[]>([
    {
      quote_id: 'quote-001',
      quote_number: 'ACE-000125',
      customer_id: 'client-001',
      customer_name: 'Smith Residence',
      status: 'calculated',
      trade_id: 'electrical',
      template_id: 'template-001',
      raw_data_fields: {
        project_type: 'Electrical Panel Upgrade',
        location: '123 Main Street, Brisbane',
        urgency: 'standard'
      },
      line_items_raw: [],
      calculated_summary: {
        subtotal_before_discounts: 2850.00,
        discount_amount: 0,
        subtotal_after_discounts: 2850.00,
        rebates_applied: [],
        total_rebates: 0,
        subtotal_after_rebates: 2850.00,
        tax_amount: 285.00,
        final_total_amount: 3135.00,
        margin_summary: {
          total_cost: 2100.00,
          total_margin: 750.00,
          overall_margin_percentage: 35.7
        }
      },
      export_history: [],
      created_at: new Date('2024-06-01T09:15:00'),
      updated_at: new Date('2024-06-01T14:30:00'),
      expires_at: new Date('2024-07-01')
    },
    {
      quote_id: 'quote-002',
      quote_number: 'ACE-000124',
      customer_id: 'client-003',
      customer_name: 'Wilson Family Home',
      status: 'exported',
      trade_id: 'solar',
      template_id: 'template-002',
      raw_data_fields: {
        project_type: 'Solar Panel Installation',
        location: '789 Elm Street, Toowoomba',
        system_size: '6.6kW'
      },
      line_items_raw: [],
      calculated_summary: {
        subtotal_before_discounts: 8500.00,
        discount_amount: 500.00,
        subtotal_after_discounts: 8000.00,
        rebates_applied: [
          { rebate_id: 'solar-rebate', name: 'Solar Rebate', amount: 1200.00 }
        ],
        total_rebates: 1200.00,
        subtotal_after_rebates: 6800.00,
        tax_amount: 680.00,
        final_total_amount: 7480.00,
        margin_summary: {
          total_cost: 5200.00,
          total_margin: 1600.00,
          overall_margin_percentage: 30.8
        }
      },
      export_history: [
        {
          export_id: 'exp-001',
          exported_at: new Date('2024-05-30T16:45:00'),
          external_system: 'Make.com',
          status: 'success'
        }
      ],
      created_at: new Date('2024-05-28T11:20:00'),
      updated_at: new Date('2024-05-30T16:45:00'),
      expires_at: new Date('2024-06-28')
    },
    {
      quote_id: 'quote-003',
      quote_number: 'ACE-000123',
      customer_id: 'client-002',
      customer_name: 'Johnson Commercial Building',
      status: 'draft',
      trade_id: 'electrical',
      template_id: 'template-001',
      raw_data_fields: {
        project_type: 'Commercial Electrical Upgrade',
        location: '456 Business Blvd, Gold Coast'
      },
      line_items_raw: [],
      export_history: [],
      created_at: new Date('2024-05-25T13:10:00'),
      updated_at: new Date('2024-05-25T13:10:00'),
      expires_at: new Date('2024-06-25')
    }
  ]);

  // Mock clients and trades for dropdowns
  const [clients] = useState<Client[]>([
    { client_id: 'client-001', name: 'Smith Residence', address: '123 Main Street, Brisbane', email: 'john.smith@email.com', created_at: new Date(), updated_at: new Date() },
    { client_id: 'client-002', name: 'Johnson Commercial Building', address: '456 Business Blvd, Gold Coast', email: 'sarah@johnsonprops.com', created_at: new Date(), updated_at: new Date() },
    { client_id: 'client-003', name: 'Wilson Family Home', address: '789 Elm Street, Toowoomba', email: 'mike.wilson@email.com', created_at: new Date(), updated_at: new Date() }
  ]);

  const [trades] = useState<Trade[]>([
    { trade_id: 'electrical', name: 'Electrical Services', description: 'General electrical work', is_active: true, created_at: new Date(), updated_at: new Date() },
    { trade_id: 'solar', name: 'Solar Installation', description: 'Solar panel systems', is_active: true, created_at: new Date(), updated_at: new Date() }
  ]);

  const [templates] = useState<TradeTemplate[]>([
    { template_id: 'template-001', name: 'Standard Electrical Quote', type: 'standard_form', structure: {}, is_active: true, created_at: new Date(), updated_at: new Date() },
    { template_id: 'template-002', name: 'Solar Consultation Flow', type: 'conversational_flow', structure: {}, is_active: true, created_at: new Date(), updated_at: new Date() }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tradeFilter, setTradeFilter] = useState<string>('all');
  const [isCreateQuoteOpen, setIsCreateQuoteOpen] = useState(false);

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.raw_data_fields.project_type?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    const matchesTrade = tradeFilter === 'all' || quote.trade_id === tradeFilter;
    return matchesSearch && matchesStatus && matchesTrade;
  });

  const getStatusIcon = (status: Quote['status']) => {
    switch (status) {
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'calculated':
        return <Calculator className="h-4 w-4 text-blue-500" />;
      case 'exported':
        return <Send className="h-4 w-4 text-green-500" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'calculated':
        return 'bg-blue-100 text-blue-800';
      case 'exported':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateQuote = (clientId: string, tradeId: string, templateId: string) => {
    // In a real implementation, this would create a new quote and navigate to the quote builder
    toast.success('Creating new quote...');
    setIsCreateQuoteOpen(false);
    
    // Navigate to quote builder (this route would need to be implemented)
    // navigate(`/quotes/builder?client=${clientId}&trade=${tradeId}&template=${templateId}`);
  };

  const handleViewQuote = (quoteId: string) => {
    // Navigate to quote view/edit page
    navigate(`/quotes/${quoteId}`);
  };

  const handleExportQuote = async (quoteId: string) => {
    try {
      toast.loading('Exporting quote...', { duration: 2000 });
      // In a real implementation, this would trigger the export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Quote exported successfully');
    } catch (error) {
      toast.error('Failed to export quote');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quote Management</h1>
          <p className="text-gray-600 mt-1">Create, manage, and track your quotes</p>
        </div>
        <Dialog open={isCreateQuoteOpen} onOpenChange={setIsCreateQuoteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Start New Quote</DialogTitle>
              <DialogDescription>Select client and trade template to begin</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="quote-client">Select Client *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.client_id} value={client.client_id}>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.address}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quote-trade">Select Trade *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a trade" />
                  </SelectTrigger>
                  <SelectContent>
                    {trades.map(trade => (
                      <SelectItem key={trade.trade_id} value={trade.trade_id}>
                        {trade.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quote-template">Select Template *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.template_id} value={template.template_id}>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-500">
                            {template.type === 'conversational_flow' ? 'Interactive Flow' : 'Standard Form'}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateQuoteOpen(false)}>Cancel</Button>
              <Button onClick={() => handleCreateQuote('client-001', 'electrical', 'template-001')}>
                Start Quote
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quotes.length}</div>
            <p className="text-xs text-green-600 mt-1">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quotes.filter(q => q.status === 'draft' || q.status === 'calculated').length}
            </div>
            <p className="text-xs text-gray-600 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${quotes.reduce((sum, q) => sum + (q.calculated_summary?.final_total_amount || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-1">All quotes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
            <Calculator className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(quotes.filter(q => q.calculated_summary).reduce((sum, q) => 
                sum + (q.calculated_summary?.margin_summary.overall_margin_percentage || 0), 0) / 
                quotes.filter(q => q.calculated_summary).length)}%
            </div>
            <p className="text-xs text-gray-600 mt-1">Average margin</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Quotes</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="calculated">Ready to Send</TabsTrigger>
          <TabsTrigger value="exported">Sent</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Quotes</CardTitle>
              <CardDescription>Manage all your quotes in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search quotes by number, client, or project..."
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
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="calculated">Calculated</SelectItem>
                      <SelectItem value="exported">Exported</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={tradeFilter} onValueChange={setTradeFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Trades</SelectItem>
                      {trades.map(trade => (
                        <SelectItem key={trade.trade_id} value={trade.trade_id}>
                          {trade.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quote #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Trade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuotes.map((quote) => (
                      <TableRow key={quote.quote_id}>
                        <TableCell className="font-mono text-sm font-medium">
                          {quote.quote_number}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{quote.customer_name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {quote.raw_data_fields.location || 'No location'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {quote.raw_data_fields.project_type || 'Untitled Project'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {trades.find(t => t.trade_id === quote.trade_id)?.name || quote.trade_id}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(quote.status)}
                            <Badge className={getStatusColor(quote.status)}>
                              {quote.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {quote.calculated_summary ? (
                            <div>
                              <div className="font-medium">
                                ${quote.calculated_summary.final_total_amount.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                {quote.calculated_summary.margin_summary.overall_margin_percentage.toFixed(1)}% margin
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">Not calculated</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{quote.created_at.toLocaleDateString()}</div>
                            <div className="text-gray-500">
                              {quote.created_at.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {quote.expires_at && (
                            <div className="text-sm">
                              <div>{quote.expires_at.toLocaleDateString()}</div>
                              <div className="text-gray-500">
                                {Math.ceil((quote.expires_at.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewQuote(quote.quote_id)}
                              title="View Quote"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Edit Quote">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {quote.status === 'calculated' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleExportQuote(quote.quote_id)}
                                title="Export Quote"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" title="Download PDF">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Delete Quote">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredQuotes.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No quotes found matching your criteria</p>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other status tabs would have similar content filtered by status */}
        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>Draft Quotes</CardTitle>
              <CardDescription>Quotes that are still being worked on</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Draft quotes will be shown here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculated">
          <Card>
            <CardHeader>
              <CardTitle>Calculated Quotes</CardTitle>
              <CardDescription>Quotes ready to be sent to clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Calculated quotes will be shown here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exported">
          <Card>
            <CardHeader>
              <CardTitle>Sent Quotes</CardTitle>
              <CardDescription>Quotes that have been sent to clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Exported quotes will be shown here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accepted">
          <Card>
            <CardHeader>
              <CardTitle>Accepted Quotes</CardTitle>
              <CardDescription>Quotes that have been accepted by clients</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Accepted quotes will be shown here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quotes;
