import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  ExternalLink, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Zap,
  Globe,
  Mail,
  FileSpreadsheet,
  Webhook,
  Key,
  TestTube,
  RefreshCw,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
  features: string[];
  configurable: boolean;
}

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'gohighlevel',
      name: 'GoHighLevel',
      description: 'Sync clients and leads from your CRM system',
      icon: <ExternalLink className="h-6 w-6" />,
      status: 'connected',
      lastSync: new Date('2024-06-01T10:30:00'),
      features: ['Client Sync', 'Lead Import', 'Contact Management'],
      configurable: true
    },
    {
      id: 'make',
      name: 'Make.com',
      description: 'Automate quote delivery and document generation',
      icon: <Zap className="h-6 w-6" />,
      status: 'connected',
      lastSync: new Date('2024-06-01T09:15:00'),
      features: ['Quote Export', 'PDF Generation', 'Email Automation'],
      configurable: true
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Advanced rebate calculations and data export',
      icon: <FileSpreadsheet className="h-6 w-6" />,
      status: 'error',
      lastSync: new Date('2024-05-30T14:20:00'),
      features: ['Rebate Rules', 'Data Export', 'Advanced Calculations'],
      configurable: true
    },
    {
      id: 'email',
      name: 'Email Service',
      description: 'Send quotes and notifications via email',
      icon: <Mail className="h-6 w-6" />,
      status: 'connected',
      features: ['Quote Delivery', 'Notifications', 'Customer Communication'],
      configurable: false
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-yellow-100 text-yellow-800';
      case 'disconnected':
        return 'bg-red-100 text-red-800';
    }
  };

  const handleConnect = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'connected' as const, lastSync: new Date() }
          : integration
      )
    );
    toast.success('Integration connected successfully');
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'disconnected' as const }
          : integration
      )
    );
    toast.success('Integration disconnected');
  };

  const handleTest = async (integrationId: string) => {
    try {
      toast.loading('Testing connection...', { duration: 2000 });
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Connection test successful');
    } catch (error) {
      toast.error('Connection test failed');
    }
  };

  const handleSync = async (integrationId: string) => {
    try {
      toast.loading('Syncing data...', { duration: 3000 });
      // Simulate sync operation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, lastSync: new Date() }
            : integration
        )
      );
      
      toast.success('Data synced successfully');
    } catch (error) {
      toast.error('Sync failed');
    }
  };

  const IntegrationConfig: React.FC<{ integration: Integration }> = ({ integration }) => {
    const [config, setConfig] = useState({
      apiKey: '',
      webhookUrl: '',
      enabled: true,
      autoSync: false,
      syncInterval: '15'
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            {integration.icon}
          </div>
          <div>
            <h3 className="font-semibold">{integration.name}</h3>
            <p className="text-sm text-gray-600">{integration.description}</p>
          </div>
        </div>

        {integration.id === 'gohighlevel' && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="ghl-api-key">API Key</Label>
              <Input
                id="ghl-api-key"
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="Enter your GoHighLevel API key"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ghl-location">Location ID</Label>
              <Input
                id="ghl-location"
                placeholder="Your GoHighLevel location ID"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-sync">Automatic Sync</Label>
                <p className="text-sm text-gray-500">Automatically sync clients every hour</p>
              </div>
              <Switch
                id="auto-sync"
                checked={config.autoSync}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, autoSync: checked }))}
              />
            </div>
          </div>
        )}

        {integration.id === 'make' && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="make-webhook">Webhook URL</Label>
              <Input
                id="make-webhook"
                value={config.webhookUrl}
                onChange={(e) => setConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                placeholder="https://hook.make.com/..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="make-template">Quote Template</Label>
              <Textarea
                id="make-template"
                placeholder="Configure your quote template structure..."
                rows={4}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="retry-failed">Retry Failed Exports</Label>
                <p className="text-sm text-gray-500">Automatically retry failed webhook calls</p>
              </div>
              <Switch id="retry-failed" defaultChecked />
            </div>
          </div>
        )}

        {integration.id === 'google-sheets' && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="sheets-id">Google Sheets ID</Label>
              <Input
                id="sheets-id"
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service-account">Service Account Key</Label>
              <Textarea
                id="service-account"
                placeholder="Paste your service account JSON key here..."
                rows={6}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-range">Data Range</Label>
              <Input
                id="sheet-range"
                defaultValue="Sheet1!A1:D100"
                placeholder="Sheet1!A1:D100"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsConfigOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsConfigOpen(false)}>Save Configuration</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-1">Connect external services to automate your workflow</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <p className="text-xs text-green-600 mt-1">
              of {integrations.length} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
            <RefreshCw className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h ago</div>
            <p className="text-xs text-gray-600 mt-1">GoHighLevel clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto Exports</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-gray-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-green-600 mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(integration.status)}
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {integration.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {integration.lastSync && (
                    <div className="text-sm text-gray-600">
                      <strong>Last sync:</strong> {integration.lastSync.toLocaleString()}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2">
                      {integration.status === 'connected' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTest(integration.id)}
                          >
                            <TestTube className="h-4 w-4 mr-2" />
                            Test
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSync(integration.id)}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sync
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleConnect(integration.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      {integration.configurable && (
                        <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedIntegration(integration)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
                              <DialogDescription>
                                Manage settings and authentication for this integration
                              </DialogDescription>
                            </DialogHeader>
                            {selectedIntegration && (
                              <IntegrationConfig integration={selectedIntegration} />
                            )}
                          </DialogContent>
                        </Dialog>
                      )}

                      {integration.status === 'connected' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDisconnect(integration.id)}
                        >
                          Disconnect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected">
          <Card>
            <CardHeader>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>Currently active integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.filter(i => i.status === 'connected').map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-gray-600">
                          Last sync: {integration.lastSync?.toLocaleString() || 'Never'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSync(integration.id)}
                      >
                        Sync Now
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedIntegration(integration);
                          setIsConfigOpen(true);
                        }}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>Integrations you can connect to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.filter(i => i.status !== 'connected').map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <Button onClick={() => handleConnect(integration.id)}>
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>Manage outgoing webhook endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="quote-webhook">Quote Export Webhook</Label>
                    <Input
                      id="quote-webhook"
                      defaultValue="https://hook.make.com/abc123def456"
                      placeholder="Enter webhook URL"
                    />
                    <p className="text-sm text-gray-500">
                      Triggered when quotes are exported or status changes
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="client-webhook">Client Sync Webhook</Label>
                    <Input
                      id="client-webhook"
                      placeholder="Enter webhook URL"
                    />
                    <p className="text-sm text-gray-500">
                      Triggered when client data is updated
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <Input
                      id="webhook-secret"
                      type="password"
                      placeholder="Optional secret key for verification"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Webhook Events</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <code>quote.calculated</code> - Quote calculation completed</li>
                    <li>• <code>quote.exported</code> - Quote sent to external system</li>
                    <li>• <code>quote.accepted</code> - Quote accepted by client</li>
                    <li>• <code>client.created</code> - New client added</li>
                    <li>• <code>client.updated</code> - Client information modified</li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Test Webhook</Button>
                  <Button>Save Configuration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Integrations;
