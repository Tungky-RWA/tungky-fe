"use client"


import { Button } from "@/components/UI/button"
import { TrendingUp, Shield, DollarSign, Calendar, Star } from "lucide-react"
import NFTCard from "../UI/NFTCard"

export default function NFTLendingSection() {

  return (
    <section className="py-20 bg-gradient-to-br from-[#5409da] via-[#4e71ff] to-[#8dd8ff] relative overflow-hidden"
    style={{
      backgroundImage: `url('/img/patern.png'), linear-gradient(to bottom right, #5409da, #4e71ff, #8dd8ff)`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right top',
      backgroundSize: 'cover',
    }}
    >
      {/* Background Animation Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#bbfbff]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#8dd8ff]/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-white/20">
            <Shield className="w-5 h-5 text-[#bbfbff]" />
            <span className="text-[#bbfbff] font-medium">Secure your Product</span>
          </div>

          <h2 className="text-5xl font-general uppercase font-bold text-white mb-6">
            Mint your
            <span className="bg-gradient-to-r from-[#bbfbff] to-white bg-clip-text text-transparent"> Product </span>
            to
            <span className="bg-gradient-to-r from-[#bbfbff] to-white bg-clip-text text-transparent"> NFT</span>
          </h2>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24 mr-4 ml-4">
          {[
            { label: "Total Volume", value: "12,450 ETH", icon: DollarSign },
            { label: "Items Sell", value: "1,234", icon: TrendingUp },
            { label: "Brands", value: "10", icon: Calendar },
            { label: "Collections", value: "89", icon: Star },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/15 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-[#bbfbff] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[#bbfbff]/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-white/20">
            <Shield className="w-5 h-5 text-[#bbfbff]" />
            <span className="text-[#bbfbff] font-medium">Secure your Product</span>
          </div>

          <h2 className="text-5xl font-general uppercase font-bold text-white mb-6">
            Mint your
            <span className="bg-gradient-to-r from-[#bbfbff] to-white bg-clip-text text-transparent"> Product </span>
            to
            <span className="bg-gradient-to-r from-[#bbfbff] to-white bg-clip-text text-transparent"> NFT</span>
          </h2> */}

          <p className="text-xl text-[#bbfbff]/80 max-w-3xl mx-auto leading-relaxed">
            The Future of Product Authentication Starts Here
          </p>
        </div>

        {/* NFT Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 mr-4 ml-4">
          < NFTCard/>
          < NFTCard/>
          < NFTCard/>
          < NFTCard/>
          < NFTCard/>
          < NFTCard/>
          {/* {nftLoans.map((nft, index) => (
            <div key={nft.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <NFTLendingCard {...nft} />
            </div>
          ))} */}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to upgrade your collection?</h3>
            <p className="text-[#bbfbff]/80 mb-6">
              Register and Join us to start mint your product
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#bbfbff] to-white text-[#5409da] font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#bbfbff]/25 transition-all duration-300 hover:scale-105">
                Register
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl transition-all duration-300 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style> */}
    </section>
  )
}
