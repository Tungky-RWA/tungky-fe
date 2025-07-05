import { Link } from 'react-router-dom';
import { 
  Package, 
  Building, 
  ArrowRight,
  Zap,
  Gem,
  Heart
} from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';

const UserDashboard = () => {
  // Dummy data for user's owned products/NFTs
  const ownedProducts = [
    { brand: 'Batik Trusmi', count: 10 },
    { brand: 'Angklung UDJO', count: 20 },
    { brand: 'SMK Car', count: 20 }
  ];

  // Calculate the total number of owned products
  const totalOwned = ownedProducts.reduce((sum, item) => sum + item.count, 0);

  // Dummy data for the 5 latest recommended products
  const recommendedProducts = [
    {
      name: 'Mega Mendung Hand-drawn Batik',
      brand: 'Batik Trusmi',
      // Replace with actual image paths
      image: '/images/batik-mega-mendung.jpg', 
      path: '/product/batik-mega-mendung'
    },
    {
      name: 'Professional 1-Octave Angklung Set',
      brand: 'Angklung UDJO',
      image: '/images/angklung-profesional.jpg',
      path: '/product/angklung-profesional'
    },
    {
      name: 'Esemka Electric Car Miniature',
      brand: 'SMK Car',
      image: '/images/mobil-esemka.jpg',
      path: '/product/miniatur-esemka'
    },
    {
      name: 'Premium Batik Scarf',
      brand: 'Batik Trusmi',
      image: '/images/selendang-batik.jpg',
      path: '/product/selendang-batik'
    },
    {
      name: 'Angklung Keychain',
      brand: 'Angklung UDJO',
      image: '/images/gantungan-kunci-angklung.jpg',
      path: '/product/gantungan-kunci-angklung'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold blockchain-gradient animate-glow">My Dashboard</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Welcome back! Here is a summary of your digital collection.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-yellow-400" />
          <span>Your Digital Collection, Secured by Web3 Technology</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: My Collection */}
        <div className="lg:col-span-1 space-y-8">
          {/* Total NFTs Owned */}
          <CardCustom variant="neon">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm">
                  <Package className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Total NFTs Owned
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {totalOwned}
                  </p>
                </div>
              </div>
            </div>
          </CardCustom>

          {/* Classification by Brand */}
          <CardCustom variant="glass">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg">
                  <Gem className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Collection by Brand</h2>
              </div>
              <div className="space-y-3">
                {ownedProducts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 backdrop-blur-sm transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted/50 rounded-lg">
                        <Building className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.brand}</span>
                    </div>
                    <span className="font-semibold text-cyan-400">{item.count} Products</span>
                  </div>
                ))}
              </div>
            </div>
          </CardCustom>
        </div>

        {/* Right Side: Product Recommendations */}
        <div className="lg:col-span-2">
          <CardCustom variant="neon">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-accent/20 to-pink-400/20 rounded-lg">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Recommended For You</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {recommendedProducts.map((product, index) => (
                  <Link key={index} to={product.path}>
                    <div className="border border-border/50 hover:border-primary/50 transition-all duration-300 group web3-glow rounded-lg overflow-hidden backdrop-blur-sm">
                      <div className="relative h-40 bg-muted overflow-hidden">
                        {/* Replace this div with an <img /> component */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                          <p className="text-xs text-muted-foreground">{product.name} Image</p>
                        </div>
                      </div>
                      <div className="p-4 bg-background/50">
                        <h3 className="font-semibold text-foreground truncate mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>
                        <ButtonCustom variant="ghost" size="sm" className="w-full border border-border/30 group-hover:border-primary/50">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-1" />
                        </ButtonCustom>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </CardCustom>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;