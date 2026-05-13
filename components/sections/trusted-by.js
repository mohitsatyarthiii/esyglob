// components/sections/trusted-by.js - RICH, DENSE, REAL MARKETPLACE DESIGN
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { 
  Building2, 
  Globe2, 
  Users2, 
  TrendingUp,
  Shield,
  Award,
  Star,
  Clock,
  CheckCircle2,
  Truck,
  Factory,
  BadgeCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Verified,
  Sparkles,
  MapPin,
  Play,
  Pause,
  Volume2,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Flag,
  DollarSign,
  Package,
  Headphones,
  BarChart3,
  Target,
  Medal,
  Trophy,
  ArrowRight,
  FileText
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Real statistics with images
const realTimeStats = {
  activeDeals: 12347,
  liveRFQs: 3421,
  onlineSuppliers: 56782,
  shipmentsToday: 89234,
  tradeVolume: 2.8, // billions
  newBuyers: 1247
}

// Live deal cards with real images
const liveDeals = [
  {
    id: 1,
    product: "Industrial CNC Machines",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    price: "$245,000",
    quantity: "5 units",
    from: "Germany",
    to: "Brazil",
    flag1: "🇩🇪",
    flag2: "🇧🇷",
    supplier: "TechPro Manufacturing",
    supplierImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    verified: true,
    rating: 4.9,
    timeLeft: "2h 15m",
    progress: 75
  },
  {
    id: 2,
    product: "Smart LED Displays",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop",
    price: "$89,500",
    quantity: "1000 units",
    from: "China",
    to: "UAE",
    flag1: "🇨🇳",
    flag2: "🇦🇪",
    supplier: "Electronix Pro",
    supplierImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    verified: true,
    rating: 4.8,
    timeLeft: "45m",
    progress: 90
  },
  {
    id: 3,
    product: "Organic Cotton Fabric",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=300&fit=crop",
    price: "$34,200",
    quantity: "5000 meters",
    from: "India",
    to: "France",
    flag1: "🇮🇳",
    flag2: "🇫🇷",
    supplier: "TextileHub",
    supplierImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    verified: true,
    rating: 4.7,
    timeLeft: "3h 20m",
    progress: 60
  }
]

// Video testimonials
const videoTestimonials = [
  {
    id: 1,
    name: "John Martinez",
    role: "CEO, GlobalTrade Inc.",
    country: "USA",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop",
    duration: "2:45",
    quote: "NexTrade transformed our supply chain completely.",
    views: "124K",
    likes: "8.2K"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Procurement Director, TechAsia",
    country: "Singapore",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop",
    duration: "1:58",
    quote: "Found reliable suppliers in just 24 hours!",
    views: "89K",
    likes: "6.5K"
  }
]

// Certification with real logos
const certifications = [
  { 
    name: "ISO 9001:2015",
    icon: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=80&h=80&fit=crop",
    issuedBy: "International Organization for Standardization",
    validUntil: "2027",
    badge: "Quality Management"
  },
  { 
    name: "SOC 2 Type II",
    icon: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop",
    issuedBy: "AICPA",
    validUntil: "2026",
    badge: "Security Certified"
  },
  { 
    name: "GDPR Compliant",
    icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop",
    issuedBy: "European Commission",
    validUntil: "2026",
    badge: "Data Protection"
  },
]

// Industry badges
const industryBadges = [
  { name: "Top Rated", icon: Star, color: "text-amber-500", count: "4.8/5" },
  { name: "Fast Response", icon: Zap, color: "text-blue-500", count: "<2h" },
  { name: "Verified", icon: BadgeCheck, color: "text-green-500", count: "100%" },
  { name: "Global", icon: Globe2, color: "text-purple-500", count: "190+" },
]

// Live news ticker items
const tickerItems = [
  "🔴 LIVE: TechGlobal just placed $2.4M order for semiconductor chips from Taiwan",
  "✅ VERIFIED: 3 new Gold Suppliers certified in Vietnam manufacturing hub",
  "📈 TRENDING: Electric vehicle components demand up 340% this quarter",
  "🚢 SHIPPING: 12,847 containers cleared customs at Rotterdam Port today",
  "🏆 AWARD: NexTrade named Best B2B Platform 2026 by World Trade Organization",
]

export function TrustedBy() {
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState(null)
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true })

  // Rotate ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % tickerItems.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-8 sm:py-12 overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* LIVE TICKER BAR - Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-4 dark:border-red-800 dark:from-red-950/30 dark:to-orange-950/30 overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-bold text-red-600 dark:text-red-400">LIVE</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <motion.div
                key={currentTickerIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                {tickerItems[currentTickerIndex]}
              </motion.div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {tickerItems.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    i === currentTickerIndex ? 'bg-red-500 w-3' : 'bg-zinc-300 dark:bg-zinc-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* SECTION HEADER - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <Badge className="mb-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 text-xs backdrop-blur-xl">
              <Sparkles className="mr-1 h-3 w-3" />
              Trusted Worldwide
            </Badge>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10M+ Businesses</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            {industryBadges.map((badge) => (
              <div key={badge.name} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/50 px-3 py-2 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-800/50">
                <badge.icon className={`h-4 w-4 ${badge.color}`} />
                <span className="text-xs font-medium">{badge.name}</span>
                <span className={`text-xs font-bold ${badge.color}`}>{badge.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MAIN CONTENT GRID - Dense, No Empty Space */}
        <div className="grid gap-4 lg:grid-cols-3">
          
          {/* COLUMN 1 - Live Deals */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <h3 className="font-semibold text-sm">Live Deals Closing</h3>
                </div>
                <Badge variant="secondary" className="text-[10px]">{liveDeals.length} active</Badge>
              </div>
              
              <div className="space-y-3">
                {liveDeals.map((deal, index) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group rounded-xl border border-zinc-200 bg-white p-3 transition-all hover:border-blue-200 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-800"
                  >
                    {/* Product Image */}
                    <div className="relative mb-2 h-36 overflow-hidden rounded-lg">
                      <img
                        src={deal.image}
                        alt={deal.product}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{deal.flag1}</span>
                          <ArrowRight className="h-3 w-3 text-white" />
                          <span className="text-sm">{deal.flag2}</span>
                        </div>
                        <Badge className="bg-red-500/80 text-white text-[10px]">
                          <Clock className="mr-1 h-2 w-2" />
                          {deal.timeLeft}
                        </Badge>
                      </div>
                    </div>

                    {/* Deal Info */}
                    <h4 className="font-semibold text-sm mb-1 truncate">{deal.product}</h4>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{deal.price}</span>
                        <span className="text-xs text-zinc-500 ml-1">/ {deal.quantity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium">{deal.rating}</span>
                      </div>
                    </div>

                    {/* Supplier Info */}
                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-700">
                      <img
                        src={deal.supplierImage}
                        alt={deal.supplier}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 flex-1 truncate">{deal.supplier}</span>
                      {deal.verified && (
                        <Verified className="h-3 w-3 text-blue-500 flex-shrink-0" />
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{ width: `${deal.progress}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2 - Real-Time Stats & Certifications */}
          <div className="space-y-4">
            {/* Live Stats Grid */}
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <h3 className="font-semibold text-sm mb-3">Real-Time Marketplace</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Active Deals", value: realTimeStats.activeDeals.toLocaleString(), icon: TrendingUp, color: "text-blue-500", change: "+12.5%" },
                  { label: "Live RFQs", value: realTimeStats.liveRFQs.toLocaleString(), icon: FileText, color: "text-purple-500", change: "+8.3%" },
                  { label: "Online Suppliers", value: realTimeStats.onlineSuppliers.toLocaleString(), icon: Factory, color: "text-green-500", change: "+5.2%" },
                  { label: "Shipments Today", value: realTimeStats.shipmentsToday.toLocaleString(), icon: Truck, color: "text-amber-500", change: "+15.7%" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      <span className="text-[10px] text-green-500 font-medium">{stat.change}</span>
                    </div>
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-[10px] text-zinc-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Certifications</h3>
                <Shield className="h-4 w-4 text-green-500" />
              </div>
              
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <img
                      src={cert.icon}
                      alt={cert.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs">{cert.name}</span>
                        <Badge className="text-[9px] bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          {cert.badge}
                        </Badge>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">
                        {cert.issuedBy} • Valid until {cert.validUntil}
                      </div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3 - Video Testimonials & Activity */}
          <div className="space-y-4">
            {/* Video Testimonials */}
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Client Stories</h3>
                <Badge variant="secondary" className="text-[10px]">47 videos</Badge>
              </div>
              
              <div className="space-y-3">
                {videoTestimonials.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="group cursor-pointer rounded-xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="h-5 w-5 text-blue-600 ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={video.image}
                          alt={video.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-xs">{video.name}</span>
                            <span>{video.flag}</span>
                          </div>
                          <div className="text-[10px] text-zinc-500">{video.role}</div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 italic mb-2">
                        "{video.quote}"
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" /> {video.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" /> 234
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Country Presence */}
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <h3 className="font-semibold text-sm mb-3">Global Presence</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { region: "Asia", countries: "45+", flag: "🌏", color: "bg-blue-50 dark:bg-blue-950/30" },
                  { region: "Europe", countries: "38+", flag: "🌍", color: "bg-green-50 dark:bg-green-950/30" },
                  { region: "Americas", countries: "25+", flag: "🌎", color: "bg-purple-50 dark:bg-purple-950/30" },
                  { region: "Africa", countries: "32+", flag: "🌍", color: "bg-amber-50 dark:bg-amber-950/30" },
                  { region: "Middle East", countries: "18+", flag: "🏜️", color: "bg-red-50 dark:bg-red-950/30" },
                  { region: "Oceania", countries: "12+", flag: "🏝️", color: "bg-cyan-50 dark:bg-cyan-950/30" },
                ].map((region) => (
                  <div
                    key={region.region}
                    className={`rounded-xl ${region.color} p-2 text-center border border-zinc-200 dark:border-zinc-700`}
                  >
                    <div className="text-xl mb-0.5">{region.flag}</div>
                    <div className="text-[10px] font-semibold">{region.region}</div>
                    <div className="text-[10px] text-zinc-500">{region.countries}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BRANDS BAR - Dense */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Featured Enterprise Clients</h3>
            <span className="text-xs text-zinc-500">10,000+ companies</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {[
              { name: "TechGlobal", logo: "TG", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=60&fit=crop" },
              { name: "SupplyPro", logo: "SP", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=60&fit=crop" },
              { name: "TradeX", logo: "TX", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=60&fit=crop" },
              { name: "Atlas", logo: "AT", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=60&fit=crop" },
              { name: "Prime", logo: "PS", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=60&fit=crop" },
              { name: "Quantum", logo: "QL", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=100&h=60&fit=crop" },
              { name: "Global", logo: "GL", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=60&fit=crop" },
              { name: "Venture", logo: "VS", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=60&fit=crop" },
            ].map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative h-16 rounded-xl border border-zinc-200 overflow-hidden dark:border-zinc-700"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white bg-white/80 dark:bg-black/80 px-2 py-1 rounded">
                    {brand.logo}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}