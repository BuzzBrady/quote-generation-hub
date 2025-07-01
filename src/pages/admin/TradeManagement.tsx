import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Settings,
  Wrench,
  FileText,
  MessageSquare,
  Eye,
  Copy,
  Download,
  Upload
} from 'lucide-react';
import ConversationalFlowBuilder from '@/components/admin/ConversationalFlowBuilder';
import { Trade, QuoteField, TradeTemplate } from '@/types';

const TradeManagement: React.FC = () => {
  // Mock data - in real app, this would come from API
  const [trades] = useState<Trade[]>([
    {
      trade_id: 'solar',
      name: 'Solar Installation',
      description: 'Solar panel installation and maintenance services',
      is_active: true,
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-06-01')
    },
    {
      trade_id: 'electrical',
      name: 'Electrical Services',
      description: 'General electrical work and repairs',
      is_active: true,
      created_at: new Date('2024-01-10'),
      updated_at: new Date('2024-05-20')
    },
    {
      trade_id: 'plumbing',
      name: 'Plumbing Services',
      description: 'Plumbing installation and repair services',
      is_active: false,
      created_at: new Date('2024-02-01'),
      updated_at: new Date('2024-03-15')
    }
  ]);

  const [quoteFields] = useState<QuoteField[]>([
    {
      field_id: 'customer_name',
      name: 'Customer Name',
      dataType: 'text',
      category: 'Customer Info',
      description: 'Full name of the customer',
      is_globally_mandatory: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      field_id: 'project_location',
      name: 'Project Location',
      dataType: 'text',
      category: 'Project Details',
      description: 'Address where work will be performed',
      is_globally_mandatory: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      field_id: 'roof_type',
      name: 'Roof Type',
      dataType: 'select',
      category: 'Solar Specific',
      description: 'Type of roof for solar installation',
      options: ['Tile', 'Metal', 'Flat', 'Concrete'],
      is_globally_mandatory: false,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  const [templates] = useState<TradeTemplate[]>([
    {
      template_id: 'solar_basic',
      name: 'Basic Solar Quote',
      type: 'standard_form',
      structure: {},
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      template_id: 'solar_conversation',
      name: 'Solar Consultation Flow',
      type: 'conversational_flow',
      structure: {},
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);

  const [selectedTrade, setSelectedTrade] = useState<string>('solar');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
  const [isFlowBuilderOpen, setIsFlowBuilderOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TradeTemplate | null>(null);

  const filteredTrades = trades.filter(trade => 
    trade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFields = quoteFields.filter(field => 
    field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trade Management</h1>
          <p className="text-gray-600 mt-1">Define trades, quote fields, and conversational flows</p>
        </div>
      </div>

      <Tabs defaultValue="trades" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trades" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Trades List
          </TabsTrigger>
          <TabsTrigger value="fields" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Quote Fields
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Templates & Flows
          </TabsTrigger>
        </TabsList>

        {/* Trades List Tab */}
        <TabsContent value="trades" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Trade Categories</CardTitle>
                  <CardDescription>Manage available trade categories for the platform</CardDescription>
                </div>
                <Dialog open={isAddTradeOpen} onOpenChange={setIsAddTradeOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Trade
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Trade</DialogTitle>
                      <DialogDescription>Create a new trade category for the platform</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="trade-name">Trade Name</Label>
                        <Input id="trade-name" placeholder="e.g., HVAC Services" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="trade-description">Description</Label>
                        <Textarea id="trade-description" placeholder="Brief description of this trade" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="trade-active" defaultChecked />
                        <Label htmlFor="trade-active">Active</Label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddTradeOpen(false)}>Cancel</Button>
                      <Button onClick={() => setIsAddTradeOpen(false)}>Create Trade</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search trades..."
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
                      <TableHead>Trade Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrades.map((trade) => (
                      <TableRow key={trade.trade_id}>
                        <TableCell className="font-medium">{trade.name}</TableCell>
                        <TableCell className="text-gray-600">{trade.description}</TableCell>
                        <TableCell>
                          <Badge variant={trade.is_active ? "default" : "secondary"}>
                            {trade.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{trade.created_at.toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quote Fields Tab */}
        <TabsContent value="fields" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Quote Fields by Trade</CardTitle>
                  <CardDescription>Manage custom fields for each trade category</CardDescription>
                </div>
                <Dialog open={isAddFieldOpen} onOpenChange={setIsAddFieldOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Field
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Quote Field</DialogTitle>
                      <DialogDescription>Create a new field for quote forms</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="field-name">Field Name</Label>
                        <Input id="field-name" placeholder="e.g., Roof Type" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="field-type">Data Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select data type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                            <SelectItem value="select">Select</SelectItem>
                            <SelectItem value="multiselect">Multi Select</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="field-category">Category</Label>
                        <Input id="field-category" placeholder="e.g., Project Details" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="field-description">Description</Label>
                        <Textarea id="field-description" placeholder="Field description" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="field-mandatory" />
                        <Label htmlFor="field-mandatory">Globally Mandatory</Label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddFieldOpen(false)}>Cancel</Button>
                      <Button onClick={() => setIsAddFieldOpen(false)}>Create Field</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="trade-selector">Select Trade</Label>
                    <Select value={selectedTrade} onValueChange={setSelectedTrade}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {trades.map((trade) => (
                          <SelectItem key={trade.trade_id} value={trade.trade_id}>
                            {trade.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="field-search">Search Fields</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="field-search"
                        placeholder="Search fields..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field Name</TableHead>
                      <TableHead>Data Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFields.map((field) => (
                      <TableRow key={field.field_id}>
                        <TableCell className="font-medium">{field.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{field.dataType}</Badge>
                        </TableCell>
                        <TableCell>{field.category}</TableCell>
                        <TableCell>
                          <Badge variant={field.is_globally_mandatory ? "default" : "secondary"}>
                            {field.is_globally_mandatory ? "Required" : "Optional"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates & Flows Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Trade Templates & Conversational Flows</CardTitle>
                  <CardDescription>Design quote templates and interactive flows for each trade</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Flow
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="template-trade-selector">Select Trade</Label>
                    <Select value={selectedTrade} onValueChange={setSelectedTrade}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {trades.map((trade) => (
                          <SelectItem key={trade.trade_id} value={trade.trade_id}>
                            {trade.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="template-search">Search Templates</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="template-search"
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card key={template.template_id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant={template.type === 'conversational_flow' ? 'default' : 'secondary'}>
                            {template.type === 'conversational_flow' ? 'Flow' : 'Form'}
                          </Badge>
                        </div>
                        <CardDescription>
                          {template.type === 'conversational_flow' 
                            ? 'Interactive conversational flow' 
                            : 'Standard form template'
                          }
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          {template.type === 'conversational_flow' && (
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedTemplate(template);
                                setIsFlowBuilderOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Flow
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Conversational Flow Builder Modal */}
      <Dialog open={isFlowBuilderOpen} onOpenChange={setIsFlowBuilderOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Conversational Flow Builder</DialogTitle>
            <DialogDescription>
              {selectedTemplate ? `Editing: ${selectedTemplate.name}` : 'Create new conversational flow'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <ConversationalFlowBuilder 
              template={selectedTemplate}
              onClose={() => setIsFlowBuilderOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TradeManagement;
