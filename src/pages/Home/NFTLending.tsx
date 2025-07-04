"use client"

import { Button } from "@/components/UI/button"
import NFTCard from "@/components/UI/NFTCard"
import { TrendingUp, Shield, DollarSign, Package, Star } from "lucide-react" // Mengganti Calendar dengan Package untuk relevansi

export default function NFTLendingSection() {

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        // Menggunakan gradasi warna baru yang konsisten
        backgroundImage: `url('/img/patern2.png'), linear-gradient(to bottom right, #1D242B, #001f3f, #0077C0)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      {/* Background Animation Elements (Warna disesuaikan) */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#0077C0]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#C7EEFF]/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#0077C0]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#0077C0]/20 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-[#C7EEFF]/20">
            <Shield className="w-5 h-5 text-[#C7EEFF]" />
            <span className="text-[#C7EEFF] font-medium">Secure your Product</span>
          </div>

          <h2 className="text-5xl font-general uppercase font-bold text-[#FAFAFA] mb-6">
            Mint your
            <span className="bg-gradient-to-r from-[#C7EEFF] to-[#FAFAFA] bg-clip-text text-transparent"> Product </span>
            to
            <span className="bg-gradient-to-r from-[#C7EEFF] to-[#FAFAFA] bg-clip-text text-transparent"> NFT</span>
          </h2>
          
          <p className="text-xl text-[#C7EEFF]/80 max-w-3xl mx-auto leading-relaxed">
            The Future of Product Authentication Starts Here
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-24 mx-4">
          {[
            { label: "Total Volume", value: "12,450 ETH", icon: DollarSign },
            { label: "Items on Sale", value: "1,234", icon: TrendingUp },
            { label: "Brands Registered", value: "10", icon: Package }, // Ikon lebih relevan
            { label: "Total Collections", value: "89", icon: Star },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#C7EEFF]/5 backdrop-blur-xl rounded-2xl p-6 border border-[#C7EEFF]/20 text-center group hover:bg-[#C7EEFF]/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <stat.icon className="w-8 h-8 text-[#C7EEFF] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[#C7EEFF]/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* NFT Cards Grid (Layout lebih responsif) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 mx-4">
          <NFTCard />
          <NFTCard />
          <NFTCard />
          <NFTCard />
          <NFTCard />
          <NFTCard />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-[#0077C0]/20 backdrop-blur-xl rounded-3xl p-8 border border-[#C7EEFF]/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Secure Your Products?</h3>
            <p className="text-[#C7EEFF]/80 mb-6">
              Register and join us to start minting your products as unique NFTs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#0077C0] text-white font-semibold px-8 py-3 rounded-xl hover:bg-opacity-80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0077C0]/30">
                Register Now
              </Button>
              <Button
                variant="outline"
                className="border-[#C7EEFF]/50 text-[#C7EEFF] hover:bg-[#C7EEFF]/10 px-8 py-3 rounded-xl transition-all duration-300 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}