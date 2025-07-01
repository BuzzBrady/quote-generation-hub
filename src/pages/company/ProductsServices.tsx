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
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Package,
  Wrench,
  Settings,
  DollarSign,
  Calculator,
  Download,
  Upload,
  Copy
} from 'lucide-react';
import { ProductService, MarginRule } from '@/types';
import toast from 'react-hot-toast';

const ProductsServices: React.FC = () => {
  // Mock data for products/services
  const [products] = useState<ProductService[]>([
    {
      product_id: 'elec-001',
      sku: 'ELEC-WIRE-001',
      name: 'Electrical Wire - 2.5mm',
      description: 'High-quality electrical wire suitable for residential installations',
      type: 'material',
      category: 'Electrical Supplies',
      base_cost: 15.50,
      unit_of_measure: 'meter',
      default_margin_percentage: 25,
      is_active: true,
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-06-01')
    },
    {
      product_id: 'elec-002',
      sku: 'ELEC-OUTLET-001',
      name: 'Power Outlet - Double GPO',
      description: 'Standard double power outlet with safety switch',
      type: 'material',
      category: 'Electrical Fittings',
      base_cost: 45.00,
      unit_of_measure: 'each',
      default_margin_percentage: 30,
      is_active: true,
      created_at: new Date('2024-01-20'),
      updated_at: new Date('2024-05-20')
    },
    {
      product_id: 'labor-001',
      sku: 'LAB-ELECTRICIAN',
      name: 'Licensed Electrician Labor',
      description: 'Hourly rate for qualified electrician work',
      type: 'labour',
      category: 'Labor',
      base_cost: 85.00,
      unit_of_measure: 'hour',
      default_margin_percentage: 40,
      is_active: true,
      created_at: new Date('2024-02-01'),
      updated_at: new Date('2024-05-15')
    },
    {
      product_id: 'serv-001',
      sku: 'SERV-INSPECTION',
      name: 'Electrical Safety Inspection',
      description: 'Comprehensive electrical safety inspection service',
      type: 'service',
      category: 'Inspection Services',
      base_cost: 150.00,
      unit_of_measure: 'each',
      default_margin_percentage: 35,
      is_active: true,
      created_at: new Date('2024-02-10'),
      updated_at: new Date('2024-04-20')
    }
  ]);

  const [marginRules, setMarginRules] = useState<MarginRule[]>([
    { category: 'Electrical Supplies', margin_percentage: 25 },
    { category: 'Electrical Fittings', margin_percentage: 30 },
    { category: 'Labor', margin_percentage: 40 },
    { category: 'Inspection Services', margin_percentage: 35 },
    { category: 'Equipment', margin_percentage: 20 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditMarginOpen, setIsEditMarginOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesType = typeFilter === 'all' || product.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType && product.is_active;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));
  const types = ['material', 'labour', 'service', 'equipment'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'material':
        return <Package className="h-4 w-4" />;
      case 'labour':
        return <Wrench className="h-4 w-4" />;
      case 'service':
        return <Settings className="h-4 w-4" />;
      case 'equipment':
        return <Calculator className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'material':
        return 'bg-blue-100 text-blue-800';
      case 'labour':
        return 'bg-green-100 text-green-800';
      case 'service':
        return 'bg-purple-100 text-purple-800';
      case 'equipment':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateSellingPrice = (baseCost: number, marginPercentage: number) => {
    return baseCost * (1 + marginPercentage / 100);
  };

  const handleUpdateMarginRule = (category: string, newMargin: number) => {
    setMarginRules(prev => 
      prev.map(rule => 
        rule.category === category 
          ? { ...rule, margin_percentage: newMargin }
          : rule
      )
    );
  };

  const handleSaveMarginRules = async () => {
    try {
      // In a real implementation:
      // await productServiceService.updateMarginRules({ rules: marginRules, updated_at: new Date() });
      toast.success('Margin rules updated successfully');
      setIsEditMarginOpen(false);
    } catch (error) {
      toast.error('Failed to update margin rules');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products & Services</h1>
          <p className="text-gray-600 mt-1">Manage your company's product catalog and pricing</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product/Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product/Service</DialogTitle>
                <DialogDescription>Add a new item to your product catalog</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-sku">SKU *</Label>
                    <Input id="product-sku" placeholder="e.g., ELEC-WIRE-002" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-type">Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="labour">Labour</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="product-name">Product/Service Name *</Label>
                  <Input id="product-name" placeholder="e.g., Electrical Wire - 4.0mm" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea id="product-description" placeholder="Brief description of the product/service" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or create category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-unit">Unit of Measure *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="each">Each</SelectItem>
                        <SelectItem value="meter">Meter</SelectItem>
                        <SelectItem value="hour">Hour</SelectItem>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="kg">Kilogram</SelectItem>
                        <SelectItem value="litre">Litre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="product-cost">Base Cost (AUD) *</Label>
                    <Input id="product-cost" type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-margin">Default Margin (%) *</Label>
                    <Input id="product-margin" type="number" step="0.1" placeholder="25.0" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="product-active" defaultChecked />
                  <Label htmlFor="product-active">Active (available for quotes)</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddProductOpen(false)}>Add Product/Service</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-green-600 mt-1">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materials</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.type === 'material').length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Product inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Settings className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.filter(p => p.type === 'service' || p.type === 'labour').length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Service offerings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(products.reduce((sum, p) => sum + p.default_margin_percentage, 0) / products.length)}%
            </div>
            <p className="text-xs text-gray-600 mt-1">Average margin</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products & Services
          </TabsTrigger>
          <TabsTrigger value="margins" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Margin Rules
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Manage your products, services, and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products, SKUs, or descriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="material">Materials</SelectItem>
                      <SelectItem value="labour">Labour</SelectItem>
                      <SelectItem value="service">Services</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Cost</TableHead>
                      <TableHead>Margin %</TableHead>
                      <TableHead>Selling Price</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.product_id}>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            {product.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(product.type)}
                            <Badge className={getTypeColor(product.type)}>
                              {product.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.base_cost.toFixed(2)}</TableCell>
                        <TableCell>{product.default_margin_percentage}%</TableCell>
                        <TableCell className="font-medium">
                          ${calculateSellingPrice(product.base_cost, product.default_margin_percentage).toFixed(2)}
                        </TableCell>
                        <TableCell>{product.unit_of_measure}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
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
                    ))}
                  </TableBody>
                </Table>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No products found matching your criteria</p>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchTerm('')}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Margin Rules Tab */}
        <TabsContent value="margins">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Margin Rules</CardTitle>
                  <CardDescription>Set default margin percentages by category</CardDescription>
                </div>
                <Dialog open={isEditMarginOpen} onOpenChange={setIsEditMarginOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Margins
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Margin Rules</DialogTitle>
                      <DialogDescription>Adjust default margins for each category</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {marginRules.map((rule, index) => (
                        <div key={rule.category} className="flex items-center justify-between">
                          <Label className="font-medium">{rule.category}</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                              value={rule.margin_percentage}
                              onChange={(e) => handleUpdateMarginRule(rule.category, parseFloat(e.target.value))}
                              className="w-20"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditMarginOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveMarginRules}>
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marginRules.map((rule) => (
                  <div key={rule.category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{rule.category}</h4>
                      <p className="text-sm text-gray-500">
                        Default margin for {rule.category.toLowerCase()} items
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{rule.margin_percentage}%</div>
                      <p className="text-sm text-gray-500">Margin</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">How Margin Rules Work</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• New products automatically inherit the margin for their category</li>
                  <li>• You can override individual product margins as needed</li>
                  <li>• Margin rules apply to quote calculations and price estimates</li>
                  <li>• Changes here affect all future quotes but not existing ones</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsServices;
