
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Coins, 
  Wallet, 
  Shield, 
  Plus, 
  Smartphone,
  TrendingUp,
  Clock,
  ArrowRight,
  Zap,
  Gem
} from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';

const BrandDashboard = () => {
  const summaryCards = [
    {
      title: 'Total Products',
      value: '24',
      icon: Package,
      color: 'text-cyan-400',
      bg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
      gradient: 'from-cyan-400 to-blue-400'
    },
    {
      title: 'NFTs Minted',
      value: '18',
      icon: Coins,
      color: 'text-yellow-400',
      bg: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20',
      gradient: 'from-yellow-400 to-orange-400'
    },
    {
      title: 'Token Balance',
      value: '1,250',
      icon: Wallet,
      color: 'text-green-400',
      bg: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      gradient: 'from-green-400 to-emerald-400'
    },
    {
      title: 'Verifications',
      value: '89',
      icon: Shield,
      color: 'text-purple-400',
      bg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      gradient: 'from-purple-400 to-pink-400'
    }
  ];

  const quickActions = [
    {
      title: 'Create New NFT',
      description: 'Mint new NFTs for your products',
      icon: Plus,
      path: '/brand/nft',
      color: 'crypto',
      bg: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10'
    },
    {
      title: 'Add Product',
      description: 'Register new products in system',
      icon: Package,
      path: '/brand/product',
      color: 'neon',
      bg: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10'
    },
    {
      title: 'Request NFC Tags',
      description: 'Order NFC tags for authentication',
      icon: Smartphone,
      path: '/brand/nfc',
      color: 'crypto',
      bg: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
    }
  ];

  const recentActivity = [
    { action: 'NFT #1234 Created', time: '2 hours ago', status: 'success', icon: Gem },
    { action: 'Verification Completed', time: '4 hours ago', status: 'success', icon: Shield },
    { action: 'Product Added: Premium Watch', time: '1 day ago', status: 'info', icon: Package },
    { action: 'NFC Tags Requested', time: '2 days ago', status: 'pending', icon: Smartphone },
    { action: 'Token Purchase: 500 Tokens', time: '3 days ago', status: 'success', icon: Wallet }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold blockchain-gradient animate-glow">Brand Dashboard</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Kelola produk dan NFT Anda dengan teknologi blockchain terdepan
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-yellow-400" />
          <span>Powered by Web3 Technology</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <CardCustom key={card.title} variant="crypto" className="animate-slide-up" {...({ animationDelay: `${index * 100}ms` } as any)}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bg} backdrop-blur-sm`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {card.title}
                  </p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                    {card.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-green-400 font-medium">+12.5%</span>
                <span className="text-muted-foreground ml-2">from last month</span>
              </div>
            </div>
          </CardCustom>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <CardCustom variant="glass">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} to={action.path}>
                    <div className={`p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 group web3-glow ${action.bg} backdrop-blur-sm`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg">
                          <action.icon className="h-5 w-5 text-primary" />
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                      </div>
                      <h3 className="font-medium text-foreground mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </CardCustom>
        </div>

        {/* Recent Activity */}
        <CardCustom variant="neon">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-accent/20 to-cyan-400/20 rounded-lg">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/20 transition-colors backdrop-blur-sm">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'success' ? 'bg-green-400/20 text-green-400' :
                    activity.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-blue-400/20 text-blue-400'
                  }`}>
                    <activity.icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.action}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ButtonCustom variant="ghost" className="w-full mt-4 border border-border/30 hover:border-primary/50">
              View All Activity
            </ButtonCustom>
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default BrandDashboard;
