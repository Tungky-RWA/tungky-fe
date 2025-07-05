"use client"

import Navbar from "@/components/Layout/Navbar"
import { Button } from "@/components/UI/button"
import { Card, CardContent } from "@/components/UI/card"
import { Input } from "@/components/UI/input"
import { Search, ShoppingCart, Menu, Star, Heart, Badge } from "lucide-react"

// Dummy product data
const products = [
  {
    id: 1,
    name: "Angklung",
    category: "Aksesoris Pintar",
    price: 1499000,
    originalPrice: 1999000,
    image: "/img/user/angklung.jpeg?height=300&width=300",
    rating: 4.7,
    reviews: 98,
    isNew: true,
    discount: 25,
  },
  {
    id: 2,
    name: "ESEMKA",
    category: "Pakaian Outdoor",
    price: 899000,
    originalPrice: 1199000,
    image: "/img/user/mobil-esemka.jpeg?height=300&width=300",
    rating: 4.8,
    reviews: 215,
    isNew: false,
    discount: 25,
  },
  {
    id: 3,
    name: "Batik Mega Mendung",
    category: "Pakaian",
    price: 79900,
    originalPrice: 99900,
    image: "/img/user/mega-mendung.jpeg?height=300&width=300",
    rating: 4.9,
    reviews: 589,
    isNew: true,
    discount: 20,
  },
  {
    id: 4,
    name: "Batik Nusantara",
    category: "Pakaian",
    price: 349000,
    originalPrice: 429000,
    image: "/img/user/batik-premium.jpeg?height=300&width=300",
    rating: 4.6,
    reviews: 154,
    isNew: false,
    discount: 19,
  },
  {
    id: 5,
    name: "Angklung Profesional",
    category: "Sepatu Lokal",
    price: 989000,
    originalPrice: 1249000,
    image: "/img/user/angklung.png?height=300&width=300",
    rating: 4.8,
    reviews: 302,
    isNew: true,
    discount: 21,
  },
  {
    id: 6,
    name: "Jam Tangan Kayu Pala Nusantara",
    category: "Aksesoris Fashion",
    price: 1299000,
    originalPrice: 1599000,
    image: "img/user/jam batik.jpeg?height=300&width=300",
    rating: 4.9,
    reviews: 411,
    isNew: false,
    discount: 19,
  },
]

const brands = [
  { name: "BATIK", logo: "B" },
  { name: "ESEMKA", logo: "E" },
  { name: "TASKU", logo: "T" },
  { name: "TEROMPAH", logo: "TR" },
]

export default function MarketplaceHomepage() {
  return (
    <div className="min-h-screen bg-blockchain-gradient text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 crypto-glass border-b border-white/10">
        <Navbar/>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Product Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="crypto-card group cursor-pointer transition-all duration-300 hover:scale-105 web3-glow"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* {product.isNew && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">NEW</Badge>
                    )} */}
                    {/* {product.discount > 0 && (
                      <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                        -{product.discount}%
                      </Badge>
                    )} */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold crypto-gradient">Rp. {product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Hero/Promotional Section */}
        <section className="crypto-glass rounded-2xl p-8 md:p-12 neon-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black font-zentry uppercase leading-tight">
                  <span className="block">NEW</span>
                  <span className="block crypto-gradient">TUNGKY</span>
                  <span className="block">NEURAL</span>
                  <span className="block">COLLECTION</span>
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-6 py-4">
                {brands.map((brand, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-sm font-bold">
                      {brand.logo}
                    </div>
                    <span className="text-sm font-medium">{brand.name}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Button className="blockchain-button px-8 py-3 text-lg font-semibold">
                  DISCOVER THE COLLECTION
                  <div className="ml-2 text-xl">→</div>
                </Button>
                <p className="text-muted-foreground max-w-md">
                  An iconic collection inspired by the future and reinvented for the present. Discover the new
                  neural-enhanced products for him and her.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden crypto-glass">
                <img
                  src="/img/user/jam batik.jpeg?height=500&width=500"
                  alt="Neural Collection Hero"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Users", value: "2.4M+", icon: "👥" },
            { label: "Products Sold", value: "15K+", icon: "📦" },
            { label: "Global Reach", value: "50+", icon: "🌍" },
            { label: "Satisfaction", value: "98%", icon: "⭐" },
          ].map((stat, index) => (
            <div key={index} className="crypto-metric text-center animate-fade-in">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold crypto-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
