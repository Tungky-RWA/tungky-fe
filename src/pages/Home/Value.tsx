

import { Shield, Users, Zap, TrendingUp, Globe, Scan } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: Shield,
      title: "Digital Anti-Counterfeiting",
      description: "Irrefutable digital proof through RWA tokenization on blockchain to protect products from counterfeiting.",
      color: "from-blue-500 to-blue-600",
      delay: "0ms"
    },
    {
      icon: Users,
      title: "Consumer Trust", 
      description: "Enhanced consumer confidence and supply chain transparency through auditable verification systems.",
      color: "from-emerald-500 to-emerald-600",
      delay: "100ms"
    },
    {
      icon: Zap,
      title: "Innovation & Differentiation",
      description: "Market differentiation through cutting-edge on-chain technology that provides competitive advantages.",
      color: "from-purple-500 to-purple-600",
      delay: "200ms"
    },
    {
      icon: TrendingUp,
      title: "Product Value Enhancement",
      description: "New digital engagement through NFTs and verified unboxing experiences that increase product value.",
      color: "from-orange-500 to-orange-600",
      delay: "300ms"
    },
    {
      icon: Globe,
      title: "Operational Efficiency",
      description: "Digitization of authenticity certificates and efficient asset management through automated systems.",
      color: "from-cyan-500 to-cyan-600",
      delay: "400ms"
    },
    {
      icon: Scan,
      title: "Instant Verification",
      description: "Real-time product verification through NFC and QR codes directly connected to blockchain infrastructure.",
      color: "from-pink-500 to-pink-600",
      delay: "500ms"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-stone-50 to-gray-100 py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        {/* <div className="absolute -bottom-20 left-20 w-72 h-72 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div> */}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Why Choose Our{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Platform
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Revolutionary blockchain technology for product authentication and supply chain transparency
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ icon: Icon, title, description, color, delay }: any) => {
  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 hover:bg-white transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/10 animate-slide-up cursor-pointer"
      style={{ animationDelay: delay }}
    >
      {/* Icon Container */}
      <div className="relative mb-8">
        <div className={`w-20 h-20 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        {/* Icon glow effect */}
        <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-r ${color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
      </div>

      {/* Content */}
      <div className="relative space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
    </div>
  );
};

export default ValueProposition;
