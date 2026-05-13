// components/sections/verified-suppliers.js
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { 
  Star, 
  Verified, 
  Shield, 
  Factory, 
  Globe, 
  Award,
  BadgeCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageSquare,
  Clock,
  Trophy,
  Crown,
  Medal,
  Building2,
  Users,
  Truck,
  Eye,
  Heart,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Zap,
  TrendingUp,
  Package,
  ThumbsUp,
  FileSearch
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Verified Suppliers Data
const verifiedSuppliers = [
  {
    id: 1,
    name: "PrecisionTech Manufacturing GmbH",
    country: "Germany",
    flag: "🇩🇪",
    location: "Stuttgart, Germany",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    category: "Industrial Machinery",
    verified: true,
    goldSupplier: true,
    yearsActive: 35,
    rating: 4.9,
    reviews: 2847,
    products: 12500,
    employees: "5000+",
    certifications: ["ISO 9001:2015", "CE Certified", "TÜV Rheinland", "FDA Approved"],
    responseTime: "< 2 hours",
    responseRate: "98%",
    onTimeDelivery: "99.2%",
    exportCountries: ["USA", "Japan", "Brazil", "UAE", "UK", "France", "Australia", "Canada"],
    factorySize: "250,000 sq ft",
    annualRevenue: "$850M+",
    tradeAssurance: true,
    specialties: ["CNC Machining", "Precision Engineering", "Automation"],
    videoTour: true
  },
  {
    id: 2,
    name: "RoboTech Industries Japan",
    country: "Japan",
    flag: "🇯🇵",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    category: "Robotics & Automation",
    verified: true,
    goldSupplier: true,
    yearsActive: 28,
    rating: 4.8,
    reviews: 1956,
    products: 8900,
    employees: "3200+",
    certifications: ["ISO 14001", "ROHS Compliant", "CE Certified", "JIS Standard"],
    responseTime: "< 1 hour",
    responseRate: "95%",
    onTimeDelivery: "98.8%",
    exportCountries: ["Germany", "USA", "South Korea", "China", "UK", "Canada"],
    factorySize: "180,000 sq ft",
    annualRevenue: "$620M+",
    tradeAssurance: true,
    specialties: ["Industrial Robots", "AI Systems", "Automation"],
    videoTour: true
  },
  {
    id: 3,
    name: "ChemWorld Corporation",
    country: "USA",
    flag: "🇺🇸",
    location: "Houston, Texas, USA",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    category: "Chemicals & Materials",
    verified: true,
    goldSupplier: true,
    yearsActive: 42,
    rating: 4.9,
    reviews: 3421,
    products: 6700,
    employees: "8000+",
    certifications: ["ISO 9001", "GMP Certified", "FDA Approved", "ISO 13485", "REACH Compliant"],
    responseTime: "< 3 hours",
    responseRate: "97%",
    onTimeDelivery: "99.5%",
    exportCountries: ["Germany", "Japan", "Brazil", "India", "UK", "France", "Italy", "Canada", "Mexico"],
    factorySize: "500,000 sq ft",
    annualRevenue: "$1.2B+",
    tradeAssurance: true,
    specialties: ["Industrial Chemicals", "Pharmaceuticals", "Research"],
    videoTour: true
  },
  {
    id: 4,
    name: "TextileHub India Pvt Ltd",
    country: "India",
    flag: "🇮🇳",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    category: "Textiles & Fabrics",
    verified: true,
    goldSupplier: false,
    yearsActive: 20,
    rating: 4.7,
    reviews: 4567,
    products: 25456,
    employees: "15000+",
    certifications: ["ISO 9001", "OEKO-TEX", "GOTS Certified", "Fair Trade"],
    responseTime: "< 1 hour",
    responseRate: "93%",
    onTimeDelivery: "97.5%",
    exportCountries: ["USA", "UK", "France", "Italy", "Germany", "Japan", "Australia"],
    factorySize: "350,000 sq ft",
    annualRevenue: "$450M+",
    tradeAssurance: true,
    specialties: ["Cotton Fabrics", "Silk", "Sustainable Textiles"],
    videoTour: false
  },
  {
    id: 5,
    name: "Electronix Pro Manufacturing",
    country: "China",
    flag: "🇨🇳",
    location: "Shenzhen, China",
    image: "https://images.unsplash.com/photo-1581092334247-d06d9dc2f3ad?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    category: "Electronics",
    verified: true,
    goldSupplier: true,
    yearsActive: 15,
    rating: 4.8,
    reviews: 8912,
    products: 35000,
    employees: "25000+",
    certifications: ["ISO 9001", "CE Certified", "FCC Approved", "ROHS", "UL Listed"],
    responseTime: "< 30 min",
    responseRate: "99%",
    onTimeDelivery: "98.2%",
    exportCountries: ["USA", "Germany", "Japan", "UK", "Brazil", "UAE", "India", "Canada", "Australia", "France"],
    factorySize: "750,000 sq ft",
    annualRevenue: "$2.1B+",
    tradeAssurance: true,
    specialties: ["Consumer Electronics", "LED Displays", "IoT"],
    videoTour: true
  },
  {
    id: 6,
    name: "LeatherCraft Italia S.r.l",
    country: "Italy",
    flag: "🇮🇹",
    location: "Florence, Italy",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    category: "Fashion & Leather",
    verified: true,
    goldSupplier: true,
    yearsActive: 45,
    rating: 4.9,
    reviews: 1678,
    products: 8200,
    employees: "1200+",
    certifications: ["ISO 9001", "Made in Italy", "Leather Working Group", "REACH"],
    responseTime: "< 2 hours",
    responseRate: "96%",
    onTimeDelivery: "99.8%",
    exportCountries: ["USA", "France", "UK", "Japan", "Germany", "China", "UAE"],
    factorySize: "120,000 sq ft",
    annualRevenue: "$280M+",
    tradeAssurance: true,
    specialties: ["Luxury Leather", "Handbags", "Accessories"],
    videoTour: true
  }
]

// Supplier Card Component
const SupplierCard = ({ supplier, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Card className="rounded-2xl border border-zinc-200 bg-white/90 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-200 dark:border-zinc-700 dark:bg-zinc-900/90 dark:hover:border-blue-800">
        {/* Supplier Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={supplier.image}
            alt={supplier.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-green-500/90 text-white backdrop-blur-sm border-0">
              <Verified className="mr-1 h-3 w-3" />
              Verified
            </Badge>
            {supplier.goldSupplier && (
              <Badge className="bg-amber-500/90 text-white backdrop-blur-sm border-0">
                <Crown className="mr-1 h-3 w-3" />
                Gold Supplier
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} />
          </motion.button>

          {/* Bottom Info */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={supplier.logo}
                alt={supplier.name}
                className="h-10 w-10 rounded-lg object-cover border-2 border-white"
              />
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">{supplier.name}</h3>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <MapPin className="h-3 w-3" />
                  {supplier.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl">{supplier.flag}</span>
            </div>
          </div>
        </div>

        {/* Supplier Details */}
        <div className="p-4 space-y-3">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{supplier.rating}</div>
              <div className="flex items-center justify-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-2 w-2 ${i < Math.floor(supplier.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`} />
                ))}
              </div>
              <div className="text-[10px] text-zinc-500 mt-0.5">{supplier.reviews.toLocaleString()} reviews</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">{supplier.yearsActive}+</div>
              <div className="text-[10px] text-zinc-500">Years Active</div>
              <div className="text-[10px] text-green-500 mt-0.5">Established</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{supplier.products.toLocaleString()}</div>
              <div className="text-[10px] text-zinc-500">Products</div>
              <div className="text-[10px] text-purple-500 mt-0.5">Available</div>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-1.5">
            {supplier.certifications.slice(0, 4).map((cert) => (
              <Badge key={cert} variant="secondary" className="text-[9px] py-0.5">
                <Award className="mr-1 h-2 w-2" />
                {cert}
              </Badge>
            ))}
            {supplier.certifications.length > 4 && (
              <Badge variant="secondary" className="text-[9px] py-0.5">
                +{supplier.certifications.length - 4} more
              </Badge>
            )}
          </div>

          {/* Trade Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <Clock className="h-3 w-3 text-green-500" />
              <span>Response: <strong className="text-zinc-900 dark:text-zinc-200">{supplier.responseTime}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <MessageSquare className="h-3 w-3 text-blue-500" />
              <span>Rate: <strong className="text-zinc-900 dark:text-zinc-200">{supplier.responseRate}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <Truck className="h-3 w-3 text-purple-500" />
              <span>Delivery: <strong className="text-zinc-900 dark:text-zinc-200">{supplier.onTimeDelivery}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <Globe className="h-3 w-3 text-amber-500" />
              <span>Exports: <strong className="text-zinc-900 dark:text-zinc-200">{supplier.exportCountries.length} countries</strong></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              Contact
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-xl"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              Profile
            </Button>
          </div>

          {/* Expanded Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 space-y-3">
                  {/* Factory Info */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-2">
                      <div className="text-[10px] text-zinc-500">Factory Size</div>
                      <div className="text-sm font-semibold">{supplier.factorySize}</div>
                    </div>
                    <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-2">
                      <div className="text-[10px] text-zinc-500">Employees</div>
                      <div className="text-sm font-semibold">{supplier.employees}</div>
                    </div>
                    <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-2">
                      <div className="text-[10px] text-zinc-500">Annual Revenue</div>
                      <div className="text-sm font-semibold">{supplier.annualRevenue}</div>
                    </div>
                    <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 p-2">
                      <div className="text-[10px] text-zinc-500">Trade Assurance</div>
                      <div className="text-sm font-semibold text-green-500">✓ Protected</div>
                    </div>
                  </div>

                  {/* Export Countries */}
                  <div>
                    <div className="text-[10px] text-zinc-500 mb-1.5">Export Countries</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.exportCountries.slice(0, 6).map((country) => (
                        <Badge key={country} variant="secondary" className="text-[9px]">
                          {country}
                        </Badge>
                      ))}
                      {supplier.exportCountries.length > 6 && (
                        <Badge variant="secondary" className="text-[9px]">
                          +{supplier.exportCountries.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <div className="text-[10px] text-zinc-500 mb-1.5">Specialties</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.specialties.map((spec) => (
                        <Badge key={spec} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-[9px] border-0">
                          <Zap className="mr-1 h-2 w-2" />
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {supplier.videoTour && (
                    <Button variant="outline" size="sm" className="w-full rounded-xl">
                      <Play className="mr-1.5 h-3 w-3" />
                      Watch Factory Tour
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

// Featured Supplier Large Card
const FeaturedSupplier = ({ supplier }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 dark:border-amber-700 dark:from-amber-950/30 dark:to-yellow-950/30 p-6 relative overflow-hidden"
    >
      {/* Crown Badge */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-1 bg-amber-500 text-white rounded-full px-3 py-1.5 text-xs font-bold shadow-lg">
          <Crown className="h-4 w-4" />
          Supplier of the Month
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left - Image */}
        <div className="relative h-64 lg:h-full rounded-xl overflow-hidden">
          <img
            src={supplier.image}
            alt={supplier.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <img src={supplier.logo} alt={supplier.name} className="h-16 w-16 rounded-xl object-cover border-4 border-white shadow-lg" />
          </div>
        </div>

        {/* Right - Info */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">{supplier.flag}</span>
              <h3 className="text-2xl font-bold">{supplier.name}</h3>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500 text-white">
                <Verified className="mr-1 h-3 w-3" />
                Verified
              </Badge>
              <Badge className="bg-amber-500 text-white">
                <Crown className="mr-1 h-3 w-3" />
                Gold Supplier
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">{supplier.rating}</span>
                <span className="text-sm text-zinc-500">({supplier.reviews.toLocaleString()})</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-white/60 dark:bg-zinc-800/60">
              <div className="text-2xl font-bold text-blue-600">{supplier.yearsActive}+</div>
              <div className="text-xs text-zinc-500">Years Active</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/60 dark:bg-zinc-800/60">
              <div className="text-2xl font-bold text-green-600">{supplier.products.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Products</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/60 dark:bg-zinc-800/60">
              <div className="text-2xl font-bold text-purple-600">{supplier.exportCountries.length}</div>
              <div className="text-xs text-zinc-500">Countries</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-2">Certifications</div>
            <div className="flex flex-wrap gap-1.5">
              {supplier.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="text-xs">
                  <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Now
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Eye className="mr-2 h-4 w-4" />
              Full Profile
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Horizontal Slider for Suppliers
const SupplierSlider = ({ suppliers }) => {
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
  }, [])

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
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg border border-zinc-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all dark:bg-zinc-800/90 dark:border-zinc-700 dark:hover:bg-zinc-800 -ml-5"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg border border-zinc-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all dark:bg-zinc-800/90 dark:border-zinc-700 dark:hover:bg-zinc-800 -mr-5"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
      >
        {suppliers.map((supplier, index) => (
          <div key={supplier.id} className="flex-shrink-0 w-[340px] sm:w-[380px] lg:w-[400px] snap-start">
            <SupplierCard supplier={supplier} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function VerifiedSuppliers() {
  const featuredSupplier = verifiedSuppliers[0] // PrecisionTech as featured

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-white via-zinc-50 to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <Badge className="mb-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm backdrop-blur-xl">
                <BadgeCheck className="mr-2 h-4 w-4" />
                Premium Suppliers
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Verified Manufacturers
                </span>
                <span className="text-zinc-600 dark:text-zinc-400"> You Can Trust</span>
              </h2>
              <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Every supplier is factory-audited, quality-checked, and performance-verified 
                before joining our marketplace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Verified Suppliers", value: "245K+", icon: Factory, color: "text-blue-500" },
                { label: "Factory Audits", value: "128K+", icon: Building2, color: "text-green-500" },
                { label: "Success Rate", value: "98.5%", icon: TrendingUp, color: "text-purple-500" },
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
        </motion.div>

        {/* Featured Supplier of the Month */}
        <div className="mb-12">
          <FeaturedSupplier supplier={featuredSupplier} />
        </div>

        {/* Supplier Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Top Verified Suppliers</h3>
                <p className="text-sm text-zinc-500">Highest rated and most trusted manufacturers</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl">
              View All Suppliers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <SupplierSlider suppliers={verifiedSuppliers} />
        </div>

        {/* Verification Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-zinc-200 bg-white/80 p-8 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80"
        >
          <h3 className="text-xl font-bold text-center mb-8">Our 5-Step Verification Process</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Document Verification", desc: "Business license & certifications checked", icon: FileSearch, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
              { step: "02", title: "Factory Audit", desc: "On-site inspection by our team", icon: Building2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/30" },
              { step: "03", title: "Quality Testing", desc: "Product samples tested in labs", icon: Shield, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/30" },
              { step: "04", title: "Performance Review", desc: "Past trade history analyzed", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30" },
              { step: "05", title: "Continuous Monitoring", desc: "Ongoing quality & delivery tracking", icon: Eye, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30" },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`text-center p-4 rounded-xl ${step.bg} relative`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step.color} bg-white dark:bg-zinc-800 mx-auto mb-3 font-bold text-sm`}>
                  {step.step}
                </div>
                <step.icon className={`h-6 w-6 ${step.color} mx-auto mb-2`} />
                <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-zinc-500">{step.desc}</p>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-zinc-300 dark:bg-zinc-600" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-2">Are You a Manufacturer?</h3>
          <p className="text-blue-100 mb-4">Get verified and connect with millions of buyers worldwide</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-zinc-100 rounded-xl">
            <BadgeCheck className="mr-2 h-5 w-5" />
            Apply for Verification
          </Button>
        </motion.div>
      </div>
    </section>
  )
}