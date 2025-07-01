import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Upload, 
  Building2, 
  Settings, 
  DollarSign,
  FileText,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const BusinessSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [businessSettings, setBusinessSettings] = useState({
    business_name: 'Acme Electrical Services',
    abn: '12 345 678 901',
    logo_url: '',
    address: '123 Main Street, Brisbane, QLD 4000',
    phone: '+61 7 1234 5678',
    email: 'info@acmeelectrical.com',
    website: 'https://www.acmeelectrical.com',
    terms_and_conditions: 'Payment is due within 30 days of invoice date. A 10% GST will be added to all services unless otherwise stated. All work is guaranteed for 12 months from completion date.'
  });

  const [systemSettings, setSystemSettings] = useState({
    quote_number_prefix: 'ACE-',
    next_quote_number: 1001,
    date_format: 'DD/MM/YYYY',
    currency_symbol: 'AUD',
    tax_rate: 10,
    tax_name: 'GST'
  });

  const handleBusinessChange = (field: string, value: string) => {
    setBusinessSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSystemChange = (field: string, value: string | number) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveBusinessSettings = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would save to Firestore
      // await companyService.updateBusinessSettings(companyId, businessSettings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Business settings saved successfully');
    } catch (error) {
      toast.error('Failed to save business settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSystemSettings = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would save to Firestore
      // await companyService.updateSystemSettings(companyId, systemSettings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('System settings saved successfully');
    } catch (error) {
      toast.error('Failed to save system settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Settings</h1>
          <p className="text-gray-600 mt-1">Configure your company information and system preferences</p>
        </div>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Business Information
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            System Settings
          </TabsTrigger>
        </TabsList>

        {/* Business Information Tab */}
        <TabsContent value="business">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>Basic information about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="business_name">Business Name *</Label>
                  <Input
                    id="business_name"
                    value={businessSettings.business_name}
                    onChange={(e) => handleBusinessChange('business_name', e.target.value)}
                    placeholder="Your business name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="abn">ABN</Label>
                  <Input
                    id="abn"
                    value={businessSettings.abn}
                    onChange={(e) => handleBusinessChange('abn', e.target.value)}
                    placeholder="12 345 678 901"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Business Address *</Label>
                  <Textarea
                    id="address"
                    value={businessSettings.address}
                    onChange={(e) => handleBusinessChange('address', e.target.value)}
                    placeholder="Enter your business address"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="logo_url">Business Logo</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="logo_url"
                      value={businessSettings.logo_url}
                      onChange={(e) => handleBusinessChange('logo_url', e.target.value)}
                      placeholder="Logo URL or upload a file"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">Recommended size: 200x200px, PNG or JPG format</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How customers can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={businessSettings.phone}
                    onChange={(e) => handleBusinessChange('phone', e.target.value)}
                    placeholder="+61 7 1234 5678"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessSettings.email}
                    onChange={(e) => handleBusinessChange('email', e.target.value)}
                    placeholder="info@yourcompany.com"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={businessSettings.website}
                    onChange={(e) => handleBusinessChange('website', e.target.value)}
                    placeholder="https://www.yourcompany.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
              <CardDescription>Default terms that appear on your quotes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="terms_and_conditions">Terms and Conditions</Label>
                <Textarea
                  id="terms_and_conditions"
                  value={businessSettings.terms_and_conditions}
                  onChange={(e) => handleBusinessChange('terms_and_conditions', e.target.value)}
                  placeholder="Enter your standard terms and conditions"
                  rows={6}
                />
                <p className="text-sm text-gray-500">
                  These terms will automatically appear on all quotes. You can customize them for individual quotes if needed.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Reset Changes</Button>
            <Button onClick={handleSaveBusinessSettings} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Business Settings
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quote Settings</CardTitle>
                <CardDescription>Configure how quotes are generated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="quote_number_prefix">Quote Number Prefix</Label>
                  <Input
                    id="quote_number_prefix"
                    value={systemSettings.quote_number_prefix}
                    onChange={(e) => handleSystemChange('quote_number_prefix', e.target.value)}
                    placeholder="QTE-"
                  />
                  <p className="text-sm text-gray-500">Example: QTE-000001, ACE-000001</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="next_quote_number">Next Quote Number</Label>
                  <Input
                    id="next_quote_number"
                    type="number"
                    value={systemSettings.next_quote_number}
                    onChange={(e) => handleSystemChange('next_quote_number', parseInt(e.target.value))}
                    min="1"
                  />
                  <p className="text-sm text-gray-500">The next automatic quote number to be assigned</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="date_format">Date Display Format</Label>
                  <Select 
                    value={systemSettings.date_format} 
                    onValueChange={(value) => handleSystemChange('date_format', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</SelectItem>
                      <SelectItem value="DD MMM YYYY">DD MMM YYYY (31 Dec 2024)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Settings</CardTitle>
                <CardDescription>Currency and tax configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="currency_symbol">Currency</Label>
                  <Select 
                    value={systemSettings.currency_symbol} 
                    onValueChange={(value) => handleSystemChange('currency_symbol', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tax_name">Tax Name</Label>
                  <Input
                    id="tax_name"
                    value={systemSettings.tax_name}
                    onChange={(e) => handleSystemChange('tax_name', e.target.value)}
                    placeholder="GST, VAT, Sales Tax, etc."
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                  <Input
                    id="tax_rate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={systemSettings.tax_rate}
                    onChange={(e) => handleSystemChange('tax_rate', parseFloat(e.target.value))}
                    placeholder="10.00"
                  />
                  <p className="text-sm text-gray-500">Enter as percentage (e.g., 10 for 10%)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your settings will appear</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Next Quote Number:</span>
                  <span>{systemSettings.quote_number_prefix}{String(systemSettings.next_quote_number).padStart(6, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date Format:</span>
                  <span>{systemSettings.date_format === 'DD/MM/YYYY' ? '31/12/2024' : 
                         systemSettings.date_format === 'MM/DD/YYYY' ? '12/31/2024' :
                         systemSettings.date_format === 'YYYY-MM-DD' ? '2024-12-31' : '31 Dec 2024'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Currency:</span>
                  <span>{systemSettings.currency_symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tax:</span>
                  <span>{systemSettings.tax_name} ({systemSettings.tax_rate}%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Reset to Defaults</Button>
            <Button onClick={handleSaveSystemSettings} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save System Settings
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessSettings;
