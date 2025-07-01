import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Database, 
  Zap, 
  Globe, 
  Shield, 
  Bell,
  HardDrive,
  Cpu,
  Clock,
  Users,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Save
} from 'lucide-react';

const PlatformSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // System status data
  const systemStatus = {
    database: { status: 'healthy', latency: '12ms', connections: 45 },
    api: { status: 'healthy', responseTime: '120ms', requests: '1.2k/min' },
    storage: { status: 'healthy', usage: 68, total: '500GB' },
    memory: { status: 'warning', usage: 85, total: '16GB' },
    cpu: { status: 'healthy', usage: 42, cores: 8 }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-1">Configure global platform settings and monitor system health</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Config
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="Quote Generation Hub" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="app-url">Application URL</Label>
                  <Input id="app-url" defaultValue="https://app.quotehub.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="QuoteHub Technologies" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@quotehub.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="UTC">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Flags</CardTitle>
                <CardDescription>Enable or disable platform features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="registration">User Registration</Label>
                    <p className="text-sm text-gray-500">Allow new user registrations</p>
                  </div>
                  <Switch id="registration" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="api-access">Public API Access</Label>
                    <p className="text-sm text-gray-500">Enable external API endpoints</p>
                  </div>
                  <Switch id="api-access" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Analytics Collection</Label>
                    <p className="text-sm text-gray-500">Collect usage analytics</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Put platform in maintenance mode</p>
                  </div>
                  <Switch id="maintenance" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="beta-features">Beta Features</Label>
                    <p className="text-sm text-gray-500">Enable experimental features</p>
                  </div>
                  <Switch id="beta-features" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Default Quote Settings</CardTitle>
              <CardDescription>Global defaults for new companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quote-prefix">Quote Number Prefix</Label>
                  <Input id="quote-prefix" defaultValue="QH-" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="AUD">AUD (A$)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input id="tax-rate" type="number" defaultValue="10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Reset to Defaults</Button>
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Configure authentication settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="120" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max-attempts">Max Login Attempts</Label>
                  <Input id="max-attempts" type="number" defaultValue="5" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
                  <Input id="lockout-duration" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mfa-required">Require MFA</Label>
                    <p className="text-sm text-gray-500">Require two-factor authentication</p>
                  </div>
                  <Switch id="mfa-required" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="strong-passwords">Strong Passwords</Label>
                    <p className="text-sm text-gray-500">Enforce strong password policy</p>
                  </div>
                  <Switch id="strong-passwords" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
                <CardDescription>Configure data security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="encryption-key">Encryption Key Rotation (days)</Label>
                  <Input id="encryption-key" type="number" defaultValue="90" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                  <Input id="backup-retention" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <p className="text-sm text-gray-500">Log all user actions</p>
                  </div>
                  <Switch id="audit-logging" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-encryption">Data Encryption at Rest</Label>
                    <p className="text-sm text-gray-500">Encrypt stored data</p>
                  </div>
                  <Switch id="data-encryption" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="gdpr-compliance">GDPR Compliance Mode</Label>
                    <p className="text-sm text-gray-500">Enable GDPR compliance features</p>
                  </div>
                  <Switch id="gdpr-compliance" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Security</CardTitle>
              <CardDescription>Configure API access and security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rate-limit">API Rate Limit (requests/minute)</Label>
                  <Input id="rate-limit" type="number" defaultValue="1000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="api-key-expiry">API Key Expiry (days)</Label>
                  <Input id="api-key-expiry" type="number" defaultValue="365" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Service</CardTitle>
                <CardDescription>Configure email delivery settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="smtp-provider">SMTP Provider</Label>
                  <Select defaultValue="sendgrid">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="aws-ses">AWS SES</SelectItem>
                      <SelectItem value="custom">Custom SMTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="from-email">From Email</Label>
                  <Input id="from-email" type="email" defaultValue="noreply@quotehub.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="from-name">From Name</Label>
                  <Input id="from-name" defaultValue="Quote Hub" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send system notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>External APIs</CardTitle>
                <CardDescription>Configure third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="ghl-webhook">GoHighLevel Webhook URL</Label>
                  <Input id="ghl-webhook" placeholder="https://your-webhook-url.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="make-webhook">Make.com Webhook URL</Label>
                  <Input id="make-webhook" placeholder="https://hook.make.com/..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="google-sheets">Google Sheets API Key</Label>
                  <Input id="google-sheets" type="password" placeholder="Enter API key" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="webhook-retry">Webhook Retry</Label>
                    <p className="text-sm text-gray-500">Retry failed webhook calls</p>
                  </div>
                  <Switch id="webhook-retry" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>Monitor third-party service connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'SendGrid Email', status: 'connected', lastTest: '2 minutes ago' },
                  { name: 'Make.com Webhook', status: 'connected', lastTest: '5 minutes ago' },
                  { name: 'Google Sheets API', status: 'warning', lastTest: '1 hour ago' },
                  { name: 'GoHighLevel API', status: 'disconnected', lastTest: '2 days ago' },
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(integration.status)}
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-gray-500">Last tested: {integration.lastTest}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Test
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system-wide notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">User Events</h4>
                <div className="space-y-3">
                  {[
                    { label: 'New user registration', email: true, push: false, description: 'When a new user registers' },
                    { label: 'User login attempts', email: false, push: true, description: 'Failed login attempts' },
                    { label: 'Password changes', email: true, push: false, description: 'When users change passwords' },
                    { label: 'Profile updates', email: false, push: false, description: 'When users update profiles' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked={item.email} />
                          <Label className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked={item.push} />
                          <Label className="text-sm">Push</Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">System Events</h4>
                <div className="space-y-3">
                  {[
                    { label: 'System errors', email: true, push: true, description: 'Critical system errors' },
                    { label: 'Performance alerts', email: true, push: false, description: 'Performance degradation alerts' },
                    { label: 'Backup completion', email: false, push: false, description: 'Daily backup status' },
                    { label: 'Security alerts', email: true, push: true, description: 'Security-related events' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked={item.email} />
                          <Label className="text-sm">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked={item.push} />
                          <Label className="text-sm">Push</Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system status monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Database</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(systemStatus.database.status)}
                      <span className="text-sm text-gray-600">{systemStatus.database.latency}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-green-500" />
                      <span className="font-medium">API</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(systemStatus.api.status)}
                      <span className="text-sm text-gray-600">{systemStatus.api.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Storage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(systemStatus.storage.status)}
                      <span className="text-sm text-gray-600">{systemStatus.storage.usage}% used</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">Memory</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(systemStatus.memory.status)}
                      <span className="text-sm text-gray-600">{systemStatus.memory.usage}% used</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">CPU</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(systemStatus.cpu.status)}
                      <span className="text-sm text-gray-600">{systemStatus.cpu.usage}% used</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
                <CardDescription>Current resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Storage</span>
                    <span className="text-sm text-gray-600">{systemStatus.storage.usage}%</span>
                  </div>
                  <Progress value={systemStatus.storage.usage} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Memory</span>
                    <span className="text-sm text-gray-600">{systemStatus.memory.usage}%</span>
                  </div>
                  <Progress value={systemStatus.memory.usage} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">CPU</span>
                    <span className="text-sm text-gray-600">{systemStatus.cpu.usage}%</span>
                  </div>
                  <Progress value={systemStatus.cpu.usage} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Active Users</p>
                      <p className="text-lg font-semibold">142</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">API Calls/min</p>
                      <p className="text-lg font-semibold">1.2k</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent System Events</CardTitle>
              <CardDescription>Latest system activity and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'info', message: 'Daily backup completed successfully', time: '2 hours ago' },
                  { type: 'warning', message: 'Memory usage exceeded 80% threshold', time: '4 hours ago' },
                  { type: 'success', message: 'System maintenance completed', time: '1 day ago' },
                  { type: 'info', message: 'New integration configured: SendGrid', time: '2 days ago' },
                  { type: 'error', message: 'Failed webhook delivery to Make.com', time: '3 days ago' },
                ].map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">
                      {event.type === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
                      {event.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {event.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {event.type === 'info' && <Clock className="h-4 w-4 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{event.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformSettings;
