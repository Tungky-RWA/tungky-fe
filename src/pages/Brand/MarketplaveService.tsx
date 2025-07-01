
import React from 'react';
import { 
  Store, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Plus,
  Eye,
  Heart,
  Star,
  Filter,
  Search
} from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Input } from '@/components/UI/input';

const MarketplaceService = () => {
  const marketplaceStats = [
    {
      title: 'Active Listings',
      value: '42',
      icon: Store,
      color: 'text-cyan-400',
      bg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
    },
    {
      title: 'Total Sales',
      value: '1,284 ETH',
      icon: TrendingUp,
      color: 'text-green-400',
      bg: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
    },
    {
      title: 'Followers',
      value: '5,240',
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
    },
    {
      title: 'Total Orders',
      value: '892',
      icon: ShoppingCart,
      color: 'text-yellow-400',
      bg: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
    }
  ];

  const featuredItems = [
    {
      id: 1,
      name: 'Premium Digital Watch NFT',
      price: '2.5 ETH',
      image: '/placeholder.svg',
      likes: 24,
      views: 156,
      rating: 4.8,
      status: 'trending'
    },
    {
      id: 2,
      name: 'Luxury Chain Collection',
      price: '1.8 ETH',
      image: '/placeholder.svg',
      likes: 18,
      views: 203,
      rating: 4.9,
      status: 'new'
    },
    {
      id: 3,
      name: 'Vintage Leather Bag',
      price: '0.9 ETH',
      image: '/placeholder.svg',
      likes: 31,
      views: 89,
      rating: 4.7,
      status: 'sold'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm">
            <Store className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold blockchain-gradient">Marketplace Service</h1>
            <p className="text-muted-foreground">Manage your products in the Web3 marketplace</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketplaceStats.map((stat, index) => (
          <CardCustom key={stat.title} variant="crypto" className="animate-slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} backdrop-blur-sm`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </CardCustom>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Marketplace Management */}
        <div className="lg:col-span-2">
          <CardCustom variant="glass">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Marketplace Management</h2>
                <ButtonCustom variant="crypto" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  List New Item
                </ButtonCustom>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search your listings..." 
                    className="pl-10 crypto-glass border-border/30"
                  />
                </div>
                <ButtonCustom variant="ghost" size="sm" className="border border-border/30">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </ButtonCustom>
              </div>

              {/* Featured Items */}
              <div className="space-y-4">
                {featuredItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 crypto-glass backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <Store className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">{item.name}</h3>
                          {item.status === 'trending' && (
                            <span className="px-2 py-1 text-xs bg-yellow-400/20 text-yellow-400 rounded-full border border-yellow-400/30">
                              Trending
                            </span>
                          )}
                          {item.status === 'new' && (
                            <span className="px-2 py-1 text-xs bg-green-400/20 text-green-400 rounded-full border border-green-400/30">
                              New
                            </span>
                          )}
                          {item.status === 'sold' && (
                            <span className="px-2 py-1 text-xs bg-red-400/20 text-red-400 rounded-full border border-red-400/30">
                              Sold
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold crypto-gradient">{item.price}</p>
                        <div className="flex gap-2 mt-2">
                          <ButtonCustom variant="ghost" size="sm">
                            Edit
                          </ButtonCustom>
                          <ButtonCustom variant="outline" size="sm">
                            View
                          </ButtonCustom>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardCustom>
        </div>

        {/* Quick Actions */}
        <CardCustom variant="neon">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <ButtonCustom variant="crypto" className="w-full justify-start">
                <Plus className="mr-3 h-4 w-4" />
                Create New Listing
              </ButtonCustom>
              <ButtonCustom variant="ghost" className="w-full justify-start border border-border/30">
                <TrendingUp className="mr-3 h-4 w-4" />
                View Analytics
              </ButtonCustom>
              <ButtonCustom variant="ghost" className="w-full justify-start border border-border/30">
                <Users className="mr-3 h-4 w-4" />
                Manage Followers
              </ButtonCustom>
              <ButtonCustom variant="ghost" className="w-full justify-start border border-border/30">
                <ShoppingCart className="mr-3 h-4 w-4" />
                Order History
              </ButtonCustom>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <h3 className="font-medium text-foreground mb-2">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Items with verified authenticity sell 3x faster. Make sure to complete your product verification process.
              </p>
            </div>
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default MarketplaceService;
