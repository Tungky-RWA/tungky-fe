

import { Package, Nfc, Smartphone, Globe } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Package,
      title: "Brand Mints NFT",
      description: "Brand registers and mints NFT on blockchain for product authentication",
      // Gradasi biru dari warna utama
      color: "from-sky-500 to-blue-600", 
      // Latar belakang biru muda
      bgColor: "bg-sky-100",
      // Teks dengan warna biru utama
      textColor: "text-blue-600"
    },
    {
      number: "02", 
      icon: Nfc,
      title: "Attach NFC/QR",
      description: "NFC tag or QR code is attached to the physical product",
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-100",
      textColor: "text-blue-600"
    },
    {
      number: "03",
      icon: Smartphone,
      title: "Buyer Scans",
      description: "Consumer scans NFC/QR for product verification",
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-100",
      textColor: "text-blue-600"
    },
    {
      number: "04",
      icon: Globe,
      title: "Web Verification",
      description: "Verification results are displayed on web interface",
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-100",
      textColor: "text-blue-600"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-tr from-stone-50 to-gray-100 relative overflow-hidden w-full">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-reveal text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Our Platform{' '}
            <span className="text-reveal bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-reveal text-xl text-gray-600 max-w-3xl mx-auto">
            Simple and secure process for trusted product authentication
          </p>
        </div>

        {/* Roadmap */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300  to-orange-300"></div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <RoadmapStep key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const RoadmapStep = ({ number, icon: Icon, title, description, color, bgColor, textColor, index }: any) => {
  return (
    <div className="relative group">
      {/* Step Number Circle */}
      <div className="flex justify-center mb-6">
        <div className={`relative w-16 h-16 ${bgColor} rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300 z-10`}>
          <span className={`text-xl font-bold ${textColor}`}>
            {number}
          </span>
          
          {/* Connecting dot for mobile */}
          {index < 3 && (
            <div className="lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
          )}
        </div>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className={`w-20 h-20 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Mobile Connection Line */}
      {index < 3 && (
        <div className="lg:hidden flex justify-center mt-8">
          <div className="w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-200"></div>
        </div>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 bg-white rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

export default HowItWorks;
