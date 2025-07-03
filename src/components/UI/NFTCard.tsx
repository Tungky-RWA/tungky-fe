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
  name = "QN31 Original",
  image = "/img/sepatu.webp?height=200&width=200",
  price = "2.5",
  currency = "ETH",
  collection = "ZORA",
}: NFTCardProps) {
  return (
    <div className="relative w-full max-w-2xl group">

      {/* Snake Glow Animation - Always Active */}
      <div className="absolute -inset-1 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 animate-snake-glow">
          <div className="absolute inset-0 bg-conic-gradient opacity-60"></div>
        </div>
      </div>


       {/* Neon Border Running Effect - Hover Only */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0077C0] via-[#C7EEFF] to-[#0077C0] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-neon-border blur-sm"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0077C0] via-[#C7EEFF] to-[#0077C0] rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-neon-border-reverse"></div>

      <Card
        className="relative w-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#0077C0]/20 hover:-translate-y-1 cursor-pointer
                       bg-[#1D242B]/40 backdrop-blur-lg border border-[#C7EEFF]/10 rounded-2xl z-10"
      >
        <CardContent className="p-0">
          <div className="flex flex-col 2xl:flex-row items-center">
            {/* Image Section */}
            <div className="mt-5 2xl:mt-0 relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden">
              <img
                src={image || "/placeholder.svg"}
                alt={name}
                className=" rounded-2xl w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0077C0]/20 to-[#C7EEFF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Animation Elements */}
              <div
                className="absolute top-4 right-4 w-3 h-3 bg-[#C7EEFF] rounded-full opacity-60 animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute bottom-6 right-6 w-2 h-2 bg-white rounded-full opacity-80 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute top-8 left-4 w-1.5 h-1.5 bg-[#C7EEFF] rounded-full opacity-70 animate-bounce"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 text-white relative overflow-hidden w-full">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0077C0]/20 rounded-full blur-xl animate-pulse" />
              <div
                className="absolute bottom-0 left-0 w-24 h-24 bg-[#C7EEFF]/5 rounded-full blur-lg animate-pulse"
                style={{ animationDelay: "1s" }}
              />

              <div className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#0077C0]/50 text-[#C7EEFF] border-none font-medium backdrop-blur-sm hover:bg-[#0077C0]/70 transition-colors duration-300"
                  >
                    {collection}
                  </Badge>
                  <h3 className="font-bold text-2xl text-[#FAFAFA] group-hover:text-white transition-colors duration-300">
                    {name}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[#C7EEFF]/80 text-sm font-medium">Current Price</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#C7EEFF] rounded-full animate-pulse" />
                      <span className="font-bold text-3xl text-white group-hover:scale-110 transition-transform duration-300">
                        {price}
                      </span>
                      <span className="font-semibold text-xl text-[#C7EEFF]/90">{currency}</span>
                    </div>
                  </div>

                  {/* Animated Price Trend */}
                  <div className="flex flex-col items-end space-y-1">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-4 bg-[#C7EEFF]/60 rounded animate-pulse" style={{ animationDelay: "0s" }} />
                      <div
                        className="w-1 h-6 bg-[#C7EEFF]/80 rounded animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div className="w-1 h-8 bg-[#C7EEFF] rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </div>
                    <span className="text-xs text-[#C7EEFF]/70">Trending ↗</span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#C7EEFF]/80">
                    <span>Rarity Score</span>
                    <span>8.5/10</span>
                  </div>
                  <div className="w-full bg-[#FAFAFA]/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0077C0] to-[#C7EEFF] rounded-full transition-all duration-1000 group-hover:w-[85%]"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
