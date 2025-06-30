"use client"


import { Button } from "@/components/UI/button"
import { TrendingUp, Clock, Shield, Zap, DollarSign, Calendar, ArrowRight, Star, Lock } from "lucide-react"
import NFTCard from "../UI/NFTCard"

interface NFTLendingCardProps {
  id: string
  name: string
  image: string
  collection: string
  floorPrice: string
  loanAmount: string
  interestRate: string
  duration: string
  ltvRatio: string
  status: "available" | "funded" | "repaid"
  rarity: string
}

// const NFTLendingCard = ({
//   id,
//   name,
//   image,
//   collection,
//   floorPrice,
//   loanAmount,
//   interestRate,
//   duration,
//   ltvRatio,
//   status,
//   rarity,
// }: NFTLendingCardProps) => {
//   const [isHovered, setIsHovered] = useState(false)

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "available":
//         return "bg-green-500"
//       case "funded":
//         return "bg-yellow-500"
//       case "repaid":
//         return "bg-blue-500"
//       default:
//         return "bg-gray-500"
//     }
//   }

//   return (
//     <Card
//       className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <CardContent className="p-0">
//         <div className="relative">
//           {/* NFT Image */}
//           <div className="relative h-64 overflow-hidden">
//             <img
//               src={image || "/placeholder.svg"}
//               alt={name}
//               className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//             {/* Status Badge */}
//             <div className="absolute top-4 left-4">
//               <Badge className={`${getStatusColor(status)} text-white border-0 font-medium`}>
//                 <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//               </Badge>
//             </div>

//             {/* Rarity Badge */}
//             <div className="absolute top-4 right-4">
//               <Badge variant="secondary" className="bg-[#bbfbff]/90 text-[#5409da] border-0 font-medium">
//                 <Star className="w-3 h-3 mr-1" />
//                 {rarity}
//               </Badge>
//             </div>

//             {/* Floating Animation Elements */}
//             <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
//               <Shield className="w-4 h-4" />
//               <span className="text-sm font-medium">{collection}</span>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6 space-y-4">
//             <div>
//               <h3 className="font-bold text-xl text-white mb-1">{name}</h3>
//               <p className="text-[#bbfbff]/80 text-sm">#{id}</p>
//             </div>

//             {/* Loan Details Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <p className="text-[#bbfbff]/70 text-xs font-medium">Floor Price</p>
//                 <div className="flex items-center space-x-1">
//                   <Zap className="w-3 h-3 text-[#bbfbff]" />
//                   <span className="text-white font-semibold">{floorPrice} ETH</span>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <p className="text-[#bbfbff]/70 text-xs font-medium">Loan Amount</p>
//                 <div className="flex items-center space-x-1">
//                   <DollarSign className="w-3 h-3 text-green-400" />
//                   <span className="text-white font-semibold">{loanAmount} ETH</span>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <p className="text-[#bbfbff]/70 text-xs font-medium">Interest Rate</p>
//                 <div className="flex items-center space-x-1">
//                   <TrendingUp className="w-3 h-3 text-yellow-400" />
//                   <span className="text-white font-semibold">{interestRate}%</span>
//                 </div>
//               </div>

//               <div className="space-y-1">
//                 <p className="text-[#bbfbff]/70 text-xs font-medium">Duration</p>
//                 <div className="flex items-center space-x-1">
//                   <Clock className="w-3 h-3 text-blue-400" />
//                   <span className="text-white font-semibold">{duration}</span>
//                 </div>
//               </div>
//             </div>

//             {/* LTV Ratio Bar */}
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-[#bbfbff]/70 text-xs font-medium">LTV Ratio</span>
//                 <span className="text-white text-sm font-semibold">{ltvRatio}%</span>
//               </div>
//               <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-[#bbfbff] to-white rounded-full transition-all duration-1000"
//                   style={{ width: isHovered ? ltvRatio + "%" : "0%" }}
//                 />
//               </div>
//             </div>

//             {/* Action Button */}
//             <Button
//               className="w-full bg-gradient-to-r from-[#5409da] to-[#4e71ff] hover:from-[#4e71ff] hover:to-[#8dd8ff] text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#5409da]/25 group"
//               disabled={status !== "available"}
//             >
//               {status === "available" ? (
//                 <>
//                   <Lock className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
//                   Lend Against NFT
//                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
//                 </>
//               ) : status === "funded" ? (
//                 <>
//                   <Calendar className="w-4 h-4 mr-2" />
//                   Loan Active
//                 </>
//               ) : (
//                 <>
//                   <Shield className="w-4 h-4 mr-2" />
//                   Loan Repaid
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

export default function NFTLendingSection() {
  const nftLoans = [
    {
      id: "7234",
      name: "Cosmic Wanderer",
      image: "/placeholder.svg?height=300&width=300",
      collection: "Cosmic Collection",
      floorPrice: "3.2",
      loanAmount: "2.4",
      interestRate: "12",
      duration: "30 days",
      ltvRatio: "75",
      status: "available" as const,
      rarity: "Rare",
    },
    {
      id: "8901",
      name: "Digital Dreams",
      image: "/placeholder.svg?height=300&width=300",
      collection: "Dream Series",
      floorPrice: "2.8",
      loanAmount: "2.0",
      interestRate: "15",
      duration: "14 days",
      ltvRatio: "71",
      status: "funded" as const,
      rarity: "Epic",
    },
    {
      id: "5678",
      name: "Neon Genesis",
      image: "/placeholder.svg?height=300&width=300",
      collection: "Neon Art",
      floorPrice: "4.1",
      loanAmount: "3.2",
      interestRate: "10",
      duration: "45 days",
      ltvRatio: "78",
      status: "available" as const,
      rarity: "Legendary",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#5409da] via-[#4e71ff] to-[#8dd8ff] relative overflow-hidden">
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

          {/* <p className="text-xl text-[#bbfbff]/80 max-w-3xl mx-auto leading-relaxed">
            The Future of Product Authentication Starts Here
          </p> */}
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

      <style jsx>{`
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
      `}</style>
    </section>
  )
}
