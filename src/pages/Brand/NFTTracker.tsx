
import { useState, useEffect, useRef } from 'react';
import { MapPin, Filter, Search, Info, Clock, Shield } from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Input } from '@/components/UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';

const NFTTracker = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [filterProduct, setFilterProduct] = useState('');
  const [filterTimeRange, setFilterTimeRange] = useState('30d');
  const [searchLocation, setSearchLocation] = useState('');

  // Sample verification data
  const verificationData = [
    {
      region: 'North America',
      country: 'United States',
      city: 'New York',
      verifications: 234,
      coordinates: [40.7128, -74.0060],
      recentVerifications: [
        { nft: 'Premium Watch #1234', time: '2 hours ago', status: 'verified' },
        { nft: 'Luxury Bag #5678', time: '4 hours ago', status: 'verified' },
        { nft: 'Designer Shoes #9012', time: '6 hours ago', status: 'verified' }
      ]
    },
    {
      region: 'Europe',
      country: 'United Kingdom',
      city: 'London',
      verifications: 189,
      coordinates: [51.5074, -0.1278],
      recentVerifications: [
        { nft: 'Smart Device #3456', time: '1 hour ago', status: 'verified' },
        { nft: 'Fashion Accessory #7890', time: '3 hours ago', status: 'verified' }
      ]
    },
    {
      region: 'Asia Pacific',
      country: 'Japan',
      city: 'Tokyo',
      verifications: 156,
      coordinates: [35.6762, 139.6503],
      recentVerifications: [
        { nft: 'Premium Watch #2468', time: '30 minutes ago', status: 'verified' },
        { nft: 'Luxury Bag #1357', time: '2 hours ago', status: 'pending' }
      ]
    }
  ];

  const products = [
    { id: 'all', name: 'All Products' },
    { id: 'watch', name: 'Premium Watch' },
    { id: 'bag', name: 'Luxury Bag' },
    { id: 'shoes', name: 'Designer Shoes' }
  ];

  useEffect(() => {
    // Placeholder for map initialization
    // In a real implementation, this would initialize Leaflet or Mapbox
    console.log('Map container ready:', mapContainer.current);
  }, []);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
  };

  const selectedRegionData = verificationData.find(data => data.region === selectedRegion);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold blockchain-gradient animate-glow ">NFT Tracker</h1>
          <p className="text-muted-foreground text-lg">
            Global verification heatmap and location insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <CardCustom variant="glass">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={filterProduct} onValueChange={setFilterProduct}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterTimeRange} onValueChange={setFilterTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <ButtonCustom variant="outline" size="sm">
              Apply Filters
            </ButtonCustom>
          </div>
        </div>
      </CardCustom>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <CardCustom variant="gradient">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Global Verification Map</h2>
              </div>

              {/* Map Placeholder */}
              <div 
                ref={mapContainer}
                className="h-96 bg-muted/30 rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                
                {/* Simulated Heatmap Points */}
                <div className="absolute inset-0">
                  {verificationData.map((location, index) => (
                    <div
                      key={location.region}
                      className={`absolute w-8 h-8 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 ${
                        selectedRegion === location.region ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-accent/70 hover:bg-accent'
                      }`}
                      style={{
                        left: `${20 + index * 25}%`,
                        top: `${30 + index * 20}%`,
                      }}
                      onClick={() => handleRegionClick(location.region)}
                    >
                      <div className="w-full h-full rounded-full animate-pulse-slow"></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground whitespace-nowrap">
                        {location.verifications}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center z-10">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Interactive Verification Heatmap</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click on hotspots to view detailed verification data
                  </p>
                </div>
              </div>

              {/* Map Legend */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Low Activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">High Activity</span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total Verifications: {verificationData.reduce((sum, item) => sum + item.verifications, 0)}
                </span>
              </div>
            </div>
          </CardCustom>
        </div>

        {/* Region Details */}
        <CardCustom variant="glass">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Info className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-semibold">Region Details</h2>
            </div>

            {selectedRegionData ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">{selectedRegionData.region}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedRegionData.city}, {selectedRegionData.country}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{selectedRegionData.verifications}</p>
                    <p className="text-xs text-muted-foreground">Total Verifications</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold text-accent">{selectedRegionData.recentVerifications.length}</p>
                    <p className="text-xs text-muted-foreground">Recent Activity</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Recent Verifications</h4>
                  <div className="space-y-3">
                    {selectedRegionData.recentVerifications.map((verification, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{verification.nft}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{verification.time}</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          verification.status === 'verified' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          <Shield className="h-3 w-3" />
                          {verification.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Click on a region on the map to view detailed verification information
                </p>
              </div>
            )}
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default NFTTracker;
