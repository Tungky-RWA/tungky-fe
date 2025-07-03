
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Sample data
  const verificationTrends = [
    { date: '2024-01-01', verifications: 45 },
    { date: '2024-01-02', verifications: 52 },
    { date: '2024-01-03', verifications: 48 },
    { date: '2024-01-04', verifications: 61 },
    { date: '2024-01-05', verifications: 55 },
    { date: '2024-01-06', verifications: 67 },
    { date: '2024-01-07', verifications: 59 }
  ];

  const topPerformingNFTs = [
    { name: 'Premium Watch', verifications: 234 },
    { name: 'Luxury Bag', verifications: 189 },
    { name: 'Designer Shoes', verifications: 145 },
    { name: 'Smart Device', verifications: 98 },
    { name: 'Fashion Accessory', verifications: 76 }
  ];

  const mintingActivity = [
    { month: 'Jan', minted: 12 },
    { month: 'Feb', minted: 19 },
    { month: 'Mar', minted: 15 },
    { month: 'Apr', minted: 22 },
    { month: 'May', minted: 18 },
    { month: 'Jun', minted: 25 }
  ];

  const tokenUsage = [
    { name: 'NFT Minting', value: 450, color: '#3B82F6' },
    { name: 'NFC Requests', value: 230, color: '#10B981' },
    { name: 'Product Registration', value: 180, color: '#8B5CF6' },
    { name: 'Other Services', value: 95, color: '#F59E0B' }
  ];

  const keyMetrics = [
    { label: 'Total Products', value: '24', change: '+12.5%', trend: 'up' },
    { label: 'NFTs Minted', value: '89', change: '+8.3%', trend: 'up' },
    { label: 'Token Balance', value: '1,250', change: '-5.2%', trend: 'down' },
    { label: 'Verification Rate', value: '94.2%', change: '+2.1%', trend: 'up' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold blockchain-gradient">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Detailed insights and performance metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <ButtonCustom variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </ButtonCustom>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <CardCustom key={metric.label} variant="neon" className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                <div className={`p-2 rounded-lg ${
                  metric.trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400 rotate-180'
                  }`} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <p className={`text-sm ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change} from last period
                </p>
              </div>
            </div>
          </CardCustom>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Verification Trends */}
        <CardCustom variant="glass">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Verification Trends</h2>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Daily</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={verificationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="verifications" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardCustom>

        {/* Top Performing NFTs */}
        <CardCustom variant="gradient">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Top Performing NFTs</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPerformingNFTs} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    width={100}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar 
                    dataKey="verifications" 
                    fill="hsl(var(--accent))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardCustom>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Minting Activity */}
        <CardCustom variant="glass">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">NFT Minting Activity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mintingActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar 
                    dataKey="minted" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardCustom>

        {/* Token Usage */}
        <CardCustom variant="gradient">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Token Usage Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tokenUsage}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tokenUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {tokenUsage.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value} tokens</span>
                </div>
              ))}
            </div>
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default Analytics;
