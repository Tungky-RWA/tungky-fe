import { Badge } from "@/components/UI/badge"
import { Card, CardContent } from "@/components/UI/card"

interface NFTCardProps {
  name?: string
  image?: string
  price?: string
  currency?: string
  collection?: string
}

export default function NFTCard({
  name = "QN31 Original ",
  image = "/img/sepatu.webp?height=200&width=200",
  price = "2.5",
  currency = "ETH",
  collection = "ZORA",
}: NFTCardProps) {
  return (
    <Card className="w-full max-w-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group bg-gradient-to-r from-[#5409da] via-[#4e71ff] to-[#8dd8ff]">
      <CardContent className="p-0">
        <div className="flex items-center h-48">
          {/* Image Section */}
          <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8dd8ff]/20 to-[#bbfbff]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Animation Elements */}
            <div
              className="absolute top-4 right-4 w-3 h-3 bg-[#bbfbff] rounded-full opacity-60 animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute bottom-6 right-6 w-2 h-2 bg-white rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute top-8 left-4 w-1.5 h-1.5 bg-[#bbfbff] rounded-full opacity-70 animate-bounce"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#bbfbff]/10 rounded-full blur-xl animate-pulse" />
            <div
              className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative z-10 space-y-4">
              <div className="space-y-2">
                <Badge
                  variant="secondary"
                  className="bg-[#bbfbff]/20 text-[#bbfbff] border-[#bbfbff]/30 font-medium backdrop-blur-sm hover:bg-[#bbfbff]/30 transition-colors duration-300"
                >
                  {collection}
                </Badge>
                <h3 className="font-bold text-2xl text-white group-hover:text-[#bbfbff] transition-colors duration-300">
                  {name}
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[#bbfbff]/80 text-sm font-medium">Current Price</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#bbfbff] rounded-full animate-pulse" />
                    <span className="font-bold text-3xl text-white group-hover:scale-110 transition-transform duration-300">
                      {price}
                    </span>
                    <span className="font-semibold text-xl text-[#bbfbff]/90">{currency}</span>
                  </div>
                </div>

                {/* Animated Price Trend */}
                <div className="flex flex-col items-end space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-4 bg-[#bbfbff]/60 rounded animate-pulse" style={{ animationDelay: "0s" }} />
                    <div className="w-1 h-6 bg-[#bbfbff]/80 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-1 h-8 bg-[#bbfbff] rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                  <span className="text-xs text-[#bbfbff]/70">Trending ↗</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#bbfbff]/80">
                  <span>Rarity Score</span>
                  <span>8.5/10</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#bbfbff] to-white rounded-full transition-all duration-1000 group-hover:w-[85%]"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
