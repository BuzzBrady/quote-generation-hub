import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Package, 
  DollarSign, 
  Plus,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Mock data - in real app, this would come from API
  const metrics = {
    totalQuotes: 24,
    quotesThisMonth: 8,
    totalRevenue: 125000,
    revenueThisMonth: 35000,
    conversionRate: 68,
    avgQuoteValue: 5200
  };

  const recentQuotes = [
    { id: 'Q-2024-001', client: 'ABC Construction', value: 8500, status: 'pending', date: '2024-07-01' },
    { id: 'Q-2024-002', client: 'Home Renovations Inc', value: 12000, status: 'accepted', date: '2024-06-30' },
    { id: 'Q-2024-003', client: 'Solar Solutions Co', value: 15500, status: 'draft', date: '2024-06-29' },
    { id: 'Q-2024-004', client: 'Green Energy Ltd', value: 9200, status: 'exported', date: '2024-06-28' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'exported': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your quotes.</p>
        </div>
        <Link to="/quotes/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New Quote
          </Button>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalQuotes}</div>
            <p className="text-xs text-green-600 mt-1">+{metrics.quotesThisMonth} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+${metrics.revenueThisMonth.toLocaleString()} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/quotes/new">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create New Quote
              </Button>
            </Link>
            <Link to="/clients/new">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
            </Link>
            <Link to="/products-services">
              <Button className="w-full justify-start" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Manage Products & Services
              </Button>
            </Link>
            <Link to="/business-settings">
              <Button className="w-full justify-start" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Update Business Settings
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quotes</CardTitle>
            <CardDescription>Your latest quote activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuotes.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">{quote.id}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(quote.status)}`}>
                        {quote.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{quote.client}</p>
                    <p className="text-xs text-gray-400">{quote.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${quote.value.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <Link to="/quotes">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Quotes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Month's Performance</CardTitle>
          <CardDescription>Key metrics for July 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.quotesThisMonth}</div>
              <p className="text-sm text-gray-600">Quotes Created</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${metrics.avgQuoteValue.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Avg Quote Value</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(metrics.quotesThisMonth * metrics.conversionRate / 100)}</div>
              <p className="text-sm text-gray-600">Quotes Accepted</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">${metrics.revenueThisMonth.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Revenue Generated</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
