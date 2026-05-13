"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Star, 
  Verified, 
  Shield, 
  Truck, 
  Clock, 
  Heart,
  Eye,
  TrendingUp,
  Award,
  Factory,
  Globe,
  Medal,
  BadgeCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Zap,
  Crown,
  ArrowRight,
  MessageSquare,
  DollarSign,
  BarChart3,
  Filter,
  SlidersHorizontal,  LayoutGrid,
  List,
  ShoppingCart,
  Flame,
  Timer,
  Gift,
  Percent,
  Gem,
  Rocket,
  Headphones,
  Package,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// MASSIVE product database with 24+ products
const allProducts = [
  // Electronics (6 products)
  {
    id: 1, name: "Smart LED Display Panel 4K", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=400&fit=crop", price: "$89.99", moq: "100 units", category: "Electronics", supplier: "Electronix Pro", country: "🇨🇳 China", verified: true, rating: 4.9, reviews: 2347, hotDeal: true, discount: "-15%", sold: 8923, responseTime: "< 2h"
  },
  {
    id: 2, name: "Industrial IoT Sensor Module", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop", price: "$45.50", moq: "500 units", category: "Electronics", supplier: "TechSense GmbH", country: "🇩🇪 Germany", verified: true, rating: 4.8, reviews: 1856, hotDeal: false, sold: 6541, responseTime: "< 1h"
  },
  {
    id: 3, name: "Microprocessor Chipset A15", image: "https://images.unsplash.com/photo-1555618564-9f8e8b2d6f6b?w=600&h=400&fit=crop", price: "$12.99", moq: "1000 units", category: "Electronics", supplier: "ChipMaster Corp", country: "🇹🇼 Taiwan", verified: true, rating: 4.7, reviews: 3456, hotDeal: true, discount: "-25%", sold: 12345, responseTime: "< 30m"
  },
  {
    id: 4, name: "Wireless Earbuds Pro Max", image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f46?w=600&h=400&fit=crop", price: "$34.99", moq: "200 units", category: "Electronics", supplier: "AudioTech Korea", country: "🇰🇷 South Korea", verified: true, rating: 4.6, reviews: 5678, hotDeal: false, sold: 23456, responseTime: "< 1h"
  },
  {
    id: 5, name: "Solar Panel 400W Mono", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop", price: "$199.99", moq: "50 units", category: "Electronics", supplier: "SunPower Tech", country: "🇯🇵 Japan", verified: true, rating: 4.9, reviews: 1234, hotDeal: true, discount: "-10%", sold: 4567, responseTime: "< 3h"
  },
  {
    id: 6, name: "Drone Camera 8K Professional", image: "https://images.unsplash.com/photo-1507582020474-9a35b7d40b1a?w=600&h=400&fit=crop", price: "$2,499", moq: "10 units", category: "Electronics", supplier: "SkyVision Pro", country: "🇺🇸 USA", verified: true, rating: 4.8, reviews: 890, hotDeal: false, sold: 1234, responseTime: "< 2h"
  },
  // Machinery (6 products)
  {
    id: 7, name: "CNC Milling Machine 5-Axis", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop", price: "$125,000", moq: "1 Set", category: "Machinery", supplier: "PrecisionTech", country: "🇩🇪 Germany", verified: true, rating: 4.9, reviews: 456, hotDeal: true, discount: "-8%", sold: 234, responseTime: "< 4h"
  },
  {
    id: 8, name: "Industrial Robot Arm", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop", price: "$85,000", moq: "1 Unit", category: "Machinery", supplier: "RoboTech Japan", country: "🇯🇵 Japan", verified: true, rating: 4.8, reviews: 321, hotDeal: false, sold: 189, responseTime: "< 1h"
  },
  {
    id: 9, name: "Hydraulic Press Machine 500T", image: "https://images.unsplash.com/photo-1581092334651-df26e3e2e2e5?w=600&h=400&fit=crop", price: "$95,000", moq: "1 Set", category: "Machinery", supplier: "PowerPress Italy", country: "🇮🇹 Italy", verified: true, rating: 4.7, reviews: 234, hotDeal: false, sold: 156, responseTime: "< 3h"
  },
  {
    id: 10, name: "Industrial 3D Printer Pro", image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=400&fit=crop", price: "$156,000", moq: "1 System", category: "Machinery", supplier: "AdditiveTech NL", country: "🇳🇱 Netherlands", verified: true, rating: 4.9, reviews: 178, hotDeal: true, discount: "-12%", sold: 89, responseTime: "< 2h"
  },
  {
    id: 11, name: "Plastic Injection Molding Machine", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop", price: "$45,000", moq: "1 Unit", category: "Machinery", supplier: "MoldTech China", country: "🇨🇳 China", verified: true, rating: 4.6, reviews: 567, hotDeal: false, sold: 345, responseTime: "< 1h"
  },
  {
    id: 12, name: "Laser Cutting Machine CO2", image: "https://images.unsplash.com/photo-1581092334786-1e4e67ed5f1b?w=600&h=400&fit=crop", price: "$32,000", moq: "1 Set", category: "Machinery", supplier: "LaserPro GmbH", country: "🇩🇪 Germany", verified: true, rating: 4.8, reviews: 432, hotDeal: true, discount: "-18%", sold: 267, responseTime: "< 2h"
  },
  // Fashion & Textiles (6 products)
  {
    id: 13, name: "Premium Cotton Fabric Roll", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=400&fit=crop", price: "$12.50", moq: "500m", category: "Fashion", supplier: "TextileHub India", country: "🇮🇳 India", verified: true, rating: 4.7, reviews: 2345, hotDeal: false, sold: 12345, responseTime: "< 1h"
  },
  {
    id: 14, name: "Designer Leather Jackets Bulk", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop", price: "$89.99", moq: "100 units", category: "Fashion", supplier: "LeatherCraft Italy", country: "🇮🇹 Italy", verified: true, rating: 4.9, reviews: 876, hotDeal: true, discount: "-20%", sold: 4567, responseTime: "< 2h"
  },
  {
    id: 15, name: "Sustainable Sportswear Set", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=400&fit=crop", price: "$24.99", moq: "200 units", category: "Fashion", supplier: "EcoWear Vietnam", country: "🇻🇳 Vietnam", verified: true, rating: 4.8, reviews: 1234, hotDeal: false, sold: 8765, responseTime: "< 1h"
  },
  {
    id: 16, name: "Silk Sarees Wholesale Lot", image: "https://images.unsplash.com/photo-1610030148237-3e9c314d4de0?w=600&h=400&fit=crop", price: "$45.00", moq: "50 units", category: "Fashion", supplier: "SilkRoute India", country: "🇮🇳 India", verified: true, rating: 4.6, reviews: 3456, hotDeal: true, discount: "-30%", sold: 12345, responseTime: "< 3h"
  },
  {
    id: 17, name: "Denim Jeans Factory Direct", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600&h=400&fit=crop", price: "$15.99", moq: "300 units", category: "Fashion", supplier: "DenimPro Bangladesh", country: "🇧🇩 Bangladesh", verified: true, rating: 4.5, reviews: 5678, hotDeal: false, sold: 23456, responseTime: "< 2h"
  },
  {
    id: 18, name: "Custom T-Shirt Printing", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop", price: "$8.99", moq: "500 units", category: "Fashion", supplier: "PrintMaster Turkey", country: "🇹🇷 Turkey", verified: true, rating: 4.7, reviews: 2345, hotDeal: false, sold: 34567, responseTime: "< 1h"
  },
  // Home & Garden (6 products)
  {
    id: 19, name: "Handcrafted Ceramic Vase Set", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop", price: "$45.00", moq: "50 sets", category: "Home Decor", supplier: "ArtisanCraft Morocco", country: "🇲🇦 Morocco", verified: true, rating: 4.8, reviews: 1234, hotDeal: true, discount: "-15%", sold: 5678, responseTime: "< 2h"
  },
  {
    id: 20, name: "Modern LED Chandelier", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=400&fit=crop", price: "$299.99", moq: "20 units", category: "Home Decor", supplier: "LightDesign Italy", country: "🇮🇹 Italy", verified: true, rating: 4.9, reviews: 678, hotDeal: false, sold: 1234, responseTime: "< 1h"
  },
  {
    id: 21, name: "Bamboo Furniture Set", image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&h=400&fit=crop", price: "$599.00", moq: "10 sets", category: "Home Decor", supplier: "EcoFurn Vietnam", country: "🇻🇳 Vietnam", verified: true, rating: 4.7, reviews: 890, hotDeal: true, discount: "-22%", sold: 2345, responseTime: "< 3h"
  },
  {
    id: 22, name: "Stainless Steel Cookware Set", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop", price: "$89.99", moq: "100 sets", category: "Home Decor", supplier: "KitchenPro China", country: "🇨🇳 China", verified: true, rating: 4.6, reviews: 3456, hotDeal: false, sold: 8765, responseTime: "< 1h"
  },
  {
    id: 23, name: "Garden Solar Lights 100pcs", image: "https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=600&h=400&fit=crop", price: "$199.99", moq: "100 units", category: "Home Decor", supplier: "SolarBright India", country: "🇮🇳 India", verified: true, rating: 4.5, reviews: 5678, hotDeal: false, sold: 12345, responseTime: "< 2h"
  },
  {
    id: 24, name: "Persian Rug Handmade", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=400&fit=crop", price: "$999.00", moq: "5 units", category: "Home Decor", supplier: "RugArtisan Iran", country: "🇮🇷 Iran", verified: true, rating: 4.9, reviews: 234, hotDeal: true, discount: "-25%", sold: 567, responseTime: "< 4h"
  }
]

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group relative h-full"
      >
        <Card className="h-full rounded-2xl border border-zinc-200 bg-white/95 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:border-zinc-700/50 dark:bg-zinc-900/95 dark:hover:border-blue-700/50">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 aspect-[4/3]">
            <motion.img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Top Left Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1.5">
              {product.hotDeal && (
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg border-0 text-[10px] py-0.5">
                  <Flame className="mr-1 h-3 w-3" />
                  HOT {product.discount}
                </Badge>
              )}
              <Badge className="bg-blue-500/90 text-white backdrop-blur-sm border-0 text-[10px] py-0.5">
                <Shield className="mr-1 h-3 w-3" />
                Assured
              </Badge>
            </div>

            {/* Top Right Actions */}
            <div className="absolute top-2 right-2 flex flex-col gap-1.5">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLiked(!isLiked)
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
              >
                <Heart className={`h-4 w-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} />
              </motion.button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowQuickView(true)
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
              >
                <Eye className="h-4 w-4 text-zinc-600" />
              </button>
            </div>

            {/* Category Tag */}
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[10px]">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-3 space-y-2">
            {/* Supplier Row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <span className="text-xs truncate text-zinc-600 dark:text-zinc-400">{product.supplier}</span>
                <span className="text-sm flex-shrink-0">{product.country}</span>
                {product.verified && (
                  <Verified className="h-3 w-3 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold">{product.rating}</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-sm line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>

            {/* Price & MOQ */}
            <div className="flex items-end justify-between pt-1 border-t border-zinc-100 dark:border-zinc-700/50">
              <div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400 leading-tight">
                  {product.price}
                </div>
                <div className="text-[10px] text-zinc-500">MOQ: {product.moq}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500">Sold</div>
                <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  {product.sold >= 1000 ? `${(product.sold/1000).toFixed(1)}K` : product.sold}
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-center gap-1 text-[10px] text-zinc-500">
              <Clock className="h-3 w-3" />
              <span className="text-green-500 font-medium">{product.responseTime}</span>
              <span className="text-zinc-400">response</span>
            </div>

            {/* Quick Action Button */}
            <Button 
              size="sm" 
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs h-8"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageSquare className="mr-1.5 h-3 w-3" />
              Contact Supplier
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowQuickView(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-2xl" />
                <button
                  onClick={() => setShowQuickView(false)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  <Badge>MOQ: {product.moq}</Badge>
                </div>
                <p className="text-zinc-500 mb-4">Supplier: {product.supplier} {product.country}</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  Contact Supplier Now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Horizontal Slider Component
const ProductSlider = ({ products, title, icon: Icon, color }) => {
  const sliderRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', checkScroll)
      checkScroll()
    }
    return () => slider?.removeEventListener('scroll', checkScroll)
  }, [products])

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative group/slider">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
          <Badge variant="secondary" className="text-[10px]">{products.length} products</Badge>
        </div>
        <div className="flex items-center gap-2">
          {/* Scroll Arrows */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <Button variant="ghost" size="sm" className="rounded-xl text-sm">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

// Marquee Component
const MarqueeRow = ({ items, direction = "left", speed = 30 }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex gap-3"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function ProductsMarketplace() {
  const [activeTab, setActiveTab] = useState("all")

 const electronics = allProducts.filter(p => p.category === "Electronics")
  const machinery = allProducts.filter(p => p.category === "Machinery")
  const fashion = allProducts.filter(p => p.category === "Fashion")
  const homeDecor = allProducts.filter(p => p.category === "Home Decor")
  const hotDeals = allProducts.filter(p => p.hotDeal === true)

  const getProductsForTab = (tab) => {
    switch(tab) {
      case "electronics": return electronics
      case "machinery": return machinery
      case "fashion": return fashion
      case "home": return homeDecor
      case "hotdeals": return hotDeals
      default: return allProducts
    }
  }

  return (
    <section className="relative bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* ===== LIVE TICKER MARQUEE ===== */}
        <div className="rounded-2xl border border-red-200/50 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 dark:border-red-800/30 p-3 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold text-red-600 dark:text-red-400">LIVE MARKET ACTIVITY</span>
          </div>
          <MarqueeRow
            items={[
              { text: "🔥 Just Sold: CNC Machine $125K → Brazil", color: "bg-red-100 dark:bg-red-900/30" },
              { text: "✅ Verified: 3 Gold Suppliers in Vietnam", color: "bg-green-100 dark:bg-green-900/30" },
              { text: "📦 Shipped: 50K LED Displays → Dubai", color: "bg-blue-100 dark:bg-blue-900/30" },
              { text: "💰 Deal: Industrial Robots 20% OFF", color: "bg-amber-100 dark:bg-amber-900/30" },
              { text: "🏆 Top: PrecisionTech Germany Awarded", color: "bg-purple-100 dark:bg-purple-900/30" },
              { text: "⚡ Trending: Solar Panels +340%", color: "bg-orange-100 dark:bg-orange-900/30" },
              { text: "🎯 RFQ: 1000 Units Needed in Mexico", color: "bg-pink-100 dark:bg-pink-900/30" },
              { text: "🌟 New: Sustainable Fashion Line", color: "bg-teal-100 dark:bg-teal-900/30" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-2 ${item.color} rounded-full px-4 py-1.5 border border-zinc-200/50 dark:border-zinc-700/50`}>
                <span className="text-xs font-medium whitespace-nowrap">{item.text}</span>
              </div>
            ))}
            speed={28}
          />
        </div>

        {/* ===== HEADER WITH STATS ===== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <Badge className="mb-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 text-xs backdrop-blur-xl border-0">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Global Marketplace
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                50M+ Products
              </span>
              <span className="text-zinc-600 dark:text-zinc-400"> From Verified Suppliers Worldwide</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Verified Suppliers", value: "245K+", icon: Factory, color: "text-blue-500" },
              { label: "Countries Served", value: "190+", icon: Globe, color: "text-green-500" },
              { label: "Daily Shipments", value: "847K", icon: Truck, color: "text-purple-500" },
              { label: "Active Buyers", value: "10M+", icon: TrendingUp, color: "text-amber-500" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/60 px-3 py-2 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/60">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <div className="text-sm font-bold leading-tight">{stat.value}</div>
                  <div className="text-[10px] text-zinc-500 leading-tight">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CATEGORY TABS ===== */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="sticky top-20 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-zinc-700 p-1.5 -mx-1">
            <TabsList className="bg-transparent flex flex-wrap gap-1 w-full">
              {[
                { value: "all", label: "All Products", icon: LayoutGrid },
                { value: "hotdeals", label: "Hot Deals", icon: Flame },
                { value: "electronics", label: "Electronics", icon: Zap },
                { value: "machinery", label: "Machinery", icon: Factory },
                { value: "fashion", label: "Fashion", icon: Sparkles },
                { value: "home", label: "Home Decor", icon: Crown },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-xl px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-md dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-blue-600 flex-1 sm:flex-none"
                >
                  <tab.icon className="mr-1.5 h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ===== TAB CONTENT ===== */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Trending Slider (Show first 8) */}
              <div className="mb-8">
                <ProductSlider
                  products={getProductsForTab(activeTab).slice(0, 8)}
                  title="Trending Now"
                  icon={Flame}
                  color="from-red-500 to-orange-500"
                />
              </div>

              {/* Full Grid (All products in tab) */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                      <LayoutGrid className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold">
                      {activeTab === "all" ? "All Products" : activeTab === "hotdeals" ? "Hot Deals" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {getProductsForTab(activeTab).length} items
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs">
                      <Filter className="mr-1.5 h-3 w-3" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs">
                      <SlidersHorizontal className="mr-1.5 h-3 w-3" />
                      Sort
                    </Button>
                  </div>
                </div>

                {/* Product Grid - 4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {getProductsForTab(activeTab).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {getProductsForTab(activeTab).length > 0 && (
                  <div className="mt-8 text-center">
                    <Button size="lg" className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                      Load More Products
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="mt-2 text-xs text-zinc-500">
                      Showing {getProductsForTab(activeTab).length} of 50M+ products
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ===== HOT DEALS SECTION (Always visible below tabs) ===== */}
          {activeTab !== "hotdeals" && (
            <div className="rounded-2xl bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 border border-red-200/50 dark:border-red-800/30 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500 shadow-lg">
                    <Flame className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-400">Flash Deals</h3>
                    <p className="text-xs text-zinc-500">Limited time offers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500 text-white text-xs">
                    <Timer className="mr-1 h-3 w-3" />
                    Ends in 12:45:30
                  </Badge>
                  <Button variant="ghost" size="sm" className="rounded-xl text-xs">
                    View All <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
              <ProductSlider
                products={hotDeals}
                title=""
                icon={Flame}
                color="from-red-500 to-orange-500"
              />
            </div>
          )}
        </Tabs>

        

        
      </div>
    </section>
  )
}