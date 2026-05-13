



// components/sections/hero.js - FIXED SMOOTH VERSION
"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  Shield,
  ArrowRight,
  Zap,
  Package,
  Factory,
  Truck,
  Star,
  Verified,
  Award,
  Clock,
  DollarSign,
  Users,
  ChevronRight,
  Cpu,
  Shirt,
  Beaker,
  ShoppingBag,
  Wrench,
  Car,
  Home,
  FlaskConical,
  Box
} from "lucide-react"

// Category-based data structure
const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: Cpu,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    stats: {
      activeSuppliers: "45,892",
      productsListed: "12,847,123",
      dailyShipments: "247,231",
      tradeVolume: "$4.2B",
      activeBuyers: "3.2M",
      dailyRFQs: "15,000",
      avgResponse: "1.8 hrs",
      tradeAssurance: "$45M"
    },
    products: [
      {
        id: 1,
        name: "Smart LED Display Panel",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=80",
        category: "Electronics",
        price: "$89.99",
        moq: "100 units",
        supplier: "Electronix Pro",
        country: "🇨🇳 China",
        verified: true,
        rating: 4.9,
        trend: "+12.5%"
      },
      {
        id: 2,
        name: "Industrial IoT Sensors",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        category: "Electronics",
        price: "$45.50",
        moq: "500 units",
        supplier: "TechSense GmbH",
        country: "🇩🇪 Germany",
        verified: true,
        rating: 4.8,
        trend: "+8.3%"
      },
      {
        id: 3,
        name: "Microprocessor Chipset",
        image: "https://images.unsplash.com/photo-1555618564-9f8e8b2d6f6b?w=600&q=80",
        category: "Electronics",
        price: "$12.99",
        moq: "1000 units",
        supplier: "ChipMaster Corp",
        country: "🇹🇼 Taiwan",
        verified: true,
        rating: 4.7,
        trend: "+15.2%"
      }
    ],
    suppliers: [
      {
        name: "Electronix Pro",
        country: "China",
        flag: "🇨🇳",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=200&q=80",
        verified: true,
        yearsActive: 15,
        rating: 4.9,
        products: "12,847",
        responseTime: "< 1 hour",
        specialization: "Consumer Electronics"
      },
      {
        name: "TechSense GmbH",
        country: "Germany",
        flag: "🇩🇪",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80",
        verified: true,
        yearsActive: 22,
        rating: 4.8,
        products: "8,421",
        responseTime: "< 2 hours",
        specialization: "Industrial Electronics"
      },
      {
        name: "ChipMaster Corp",
        country: "Taiwan",
        flag: "🇹🇼",
        image: "https://images.unsplash.com/photo-1581092334247-d06d9dc2f3ad?w=200&q=80",
        verified: true,
        yearsActive: 30,
        rating: 4.9,
        products: "15,234",
        responseTime: "< 1 hour",
        specialization: "Semiconductors"
      }
    ],
    liveActivity: [
      { action: "New RFQ posted", detail: "1000 units LED displays", from: "USA", time: "2 min ago" },
      { action: "Order confirmed", detail: "500 IoT sensors", from: "Japan", time: "5 min ago" },
      { action: "Supplier verified", detail: "ChipMaster Corp", from: "Taiwan", time: "8 min ago" }
    ]
  },
  {
    id: "machinery",
    name: "Machinery",
    icon: Wrench,
    color: "emerald",
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-500/20 to-green-500/20",
    stats: {
      activeSuppliers: "32,456",
      productsListed: "8,234,567",
      dailyShipments: "123,456",
      tradeVolume: "$8.9B",
      activeBuyers: "2.1M",
      dailyRFQs: "8,500",
      avgResponse: "3.2 hrs",
      tradeAssurance: "$85M"
    },
    products: [
      {
        id: 4,
        name: "CNC Milling Machine",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
        category: "Machinery",
        price: "$45,000",
        moq: "1 unit",
        supplier: "PrecisionTech Industries",
        country: "🇩🇪 Germany",
        verified: true,
        rating: 4.9,
        trend: "+5.8%"
      },
      {
        id: 5,
        name: "Industrial Robot Arm",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        category: "Machinery",
        price: "$125,000",
        moq: "1 unit",
        supplier: "AutoBotics Ltd",
        country: "🇯🇵 Japan",
        verified: true,
        rating: 4.8,
        trend: "+18.2%"
      },
      {
        id: 6,
        name: "Hydraulic Press Machine",
        image: "https://images.unsplash.com/photo-1581092334651-df26e3e2e2e5?w=600&q=80",
        category: "Machinery",
        price: "$78,500",
        moq: "1 unit",
        supplier: "PowerPress Corp",
        country: "🇺🇸 USA",
        verified: true,
        rating: 4.7,
        trend: "+3.5%"
      }
    ],
    suppliers: [
      {
        name: "PrecisionTech Industries",
        country: "Germany",
        flag: "🇩🇪",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80",
        verified: true,
        yearsActive: 35,
        rating: 4.9,
        products: "5,234",
        responseTime: "< 4 hours",
        specialization: "CNC Machinery"
      },
      {
        name: "AutoBotics Ltd",
        country: "Japan",
        flag: "🇯🇵",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=200&q=80",
        verified: true,
        yearsActive: 18,
        rating: 4.8,
        products: "3,421",
        responseTime: "< 2 hours",
        specialization: "Robotics"
      },
      {
        name: "PowerPress Corp",
        country: "USA",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1581092334247-d06d9dc2f3ad?w=200&q=80",
        verified: true,
        yearsActive: 42,
        rating: 4.9,
        products: "7,890",
        responseTime: "< 3 hours",
        specialization: "Industrial Presses"
      }
    ],
    liveActivity: [
      { action: "Bulk order placed", detail: "5 CNC machines", from: "Brazil", time: "3 min ago" },
      { action: "RFQ published", detail: "Industrial robot arms", from: "South Korea", time: "7 min ago" },
      { action: "Trade deal closed", detail: "Hydraulic equipment", from: "UAE", time: "12 min ago" }
    ]
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: Shirt,
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/20 to-rose-500/20",
    stats: {
      activeSuppliers: "67,234",
      productsListed: "18,456,789",
      dailyShipments: "567,890",
      tradeVolume: "$12.1B",
      activeBuyers: "5.8M",
      dailyRFQs: "25,000",
      avgResponse: "1.5 hrs",
      tradeAssurance: "$35M"
    },
    products: [
      {
        id: 7,
        name: "Premium Cotton Fabric Roll",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
        category: "Fashion",
        price: "$12.50",
        moq: "500 meters",
        supplier: "TextileHub India",
        country: "🇮🇳 India",
        verified: true,
        rating: 4.7,
        trend: "+22.1%"
      },
      {
        id: 8,
        name: "Designer Leather Jackets",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
        category: "Fashion",
        price: "$89.99",
        moq: "100 units",
        supplier: "LeatherCraft Italy",
        country: "🇮🇹 Italy",
        verified: true,
        rating: 4.9,
        trend: "+15.7%"
      },
      {
        id: 9,
        name: "Sustainable Sportswear",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
        category: "Fashion",
        price: "$24.99",
        moq: "200 units",
        supplier: "EcoWear Vietnam",
        country: "🇻🇳 Vietnam",
        verified: true,
        rating: 4.8,
        trend: "+28.3%"
      }
    ],
    suppliers: [
      {
        name: "TextileHub India",
        country: "India",
        flag: "🇮🇳",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80",
        verified: true,
        yearsActive: 20,
        rating: 4.7,
        products: "25,456",
        responseTime: "< 1 hour",
        specialization: "Cotton & Fabrics"
      },
      {
        name: "LeatherCraft Italy",
        country: "Italy",
        flag: "🇮🇹",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=200&q=80",
        verified: true,
        yearsActive: 45,
        rating: 4.9,
        products: "8,234",
        responseTime: "< 2 hours",
        specialization: "Leather Products"
      },
      {
        name: "EcoWear Vietnam",
        country: "Vietnam",
        flag: "🇻🇳",
        image: "https://images.unsplash.com/photo-1581092334247-d06d9dc2f3ad?w=200&q=80",
        verified: true,
        yearsActive: 12,
        rating: 4.8,
        products: "12,567",
        responseTime: "< 1 hour",
        specialization: "Sustainable Fashion"
      }
    ],
    liveActivity: [
      { action: "New collection launched", detail: "Summer wear 2026", from: "Italy", time: "1 min ago" },
      { action: "Bulk order confirmed", detail: "50,000 meters fabric", from: "France", time: "4 min ago" },
      { action: "Supplier awarded", detail: "Top exporter badge", from: "Vietnam", time: "10 min ago" }
    ]
  },
  {
    id: "packaging",
    name: "Packaging",
    icon: Box,
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/20 to-orange-500/20",
    stats: {
      activeSuppliers: "28,345",
      productsListed: "6,789,012",
      dailyShipments: "345,678",
      tradeVolume: "$3.4B",
      activeBuyers: "1.5M",
      dailyRFQs: "6,500",
      avgResponse: "2.1 hrs",
      tradeAssurance: "$25M"
    },
    products: [
      {
        id: 10,
        name: "Eco-Friendly Boxes",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80",
        category: "Packaging",
        price: "$2.30",
        moq: "1000 units",
        supplier: "EcoPack Solutions",
        country: "🇸🇪 Sweden",
        verified: true,
        rating: 4.8,
        trend: "+32.4%"
      },
      {
        id: 11,
        name: "Industrial Plastic Containers",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
        category: "Packaging",
        price: "$15.50",
        moq: "500 units",
        supplier: "PlastiPack Corp",
        country: "🇰🇷 South Korea",
        verified: true,
        rating: 4.6,
        trend: "+9.1%"
      },
      {
        id: 12,
        name: "Custom Printed Bags",
        image: "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=600&q=80",
        category: "Packaging",
        price: "$1.20",
        moq: "5000 units",
        supplier: "PrintPack Industries",
        country: "🇹🇷 Turkey",
        verified: true,
        rating: 4.5,
        trend: "+18.7%"
      }
    ],
    suppliers: [
      {
        name: "EcoPack Solutions",
        country: "Sweden",
        flag: "🇸🇪",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80",
        verified: true,
        yearsActive: 10,
        rating: 4.8,
        products: "3,456",
        responseTime: "< 1 hour",
        specialization: "Sustainable Packaging"
      },
      {
        name: "PlastiPack Corp",
        country: "South Korea",
        flag: "🇰🇷",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=200&q=80",
        verified: true,
        yearsActive: 28,
        rating: 4.6,
        products: "6,789",
        responseTime: "< 3 hours",
        specialization: "Industrial Packaging"
      },
      {
        name: "PrintPack Industries",
        country: "Turkey",
        flag: "🇹🇷",
        image: "https://images.unsplash.com/photo-1581092334247-d06d9dc2f3ad?w=200&q=80",
        verified: true,
        yearsActive: 15,
        rating: 4.5,
        products: "9,012",
        responseTime: "< 2 hours",
        specialization: "Custom Printing"
      }
    ],
    liveActivity: [
      { action: "Large order placed", detail: "100,000 eco boxes", from: "Germany", time: "1 min ago" },
      { action: "New supplier joined", detail: "Packaging expert", from: "Poland", time: "6 min ago" },
      { action: "Trade deal closed", detail: "Custom bags order", from: "UK", time: "9 min ago" }
    ]
  },
  {
    id: "chemicals",
    name: "Chemicals",
    icon: FlaskConical,
    color: "purple",
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-500/20 to-violet-500/20",
    stats: {
      activeSuppliers: "18,234",
      productsListed: "4,567,890",
      dailyShipments: "89,012",
      tradeVolume: "$6.7B",
      activeBuyers: "890K",
      dailyRFQs: "4,200",
      avgResponse: "4.1 hrs",
      tradeAssurance: "$55M"
    },
    products: [
      {
        id: 13,
        name: "Industrial Grade Solvents",
        image: "https://images.unsplash.com/photo-1532187863486-ab21c8c0814e?w=600&q=80",
        category: "Chemicals",
        price: "$450",
        moq: "50 kg",
        supplier: "ChemWorld Corp",
        country: "🇺🇸 USA",
        verified: true,
        rating: 4.9,
        trend: "+6.2%"
      },
      {
        id: 14,
        name: "Pharmaceutical Compounds",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
        category: "Chemicals",
        price: "$2,300",
        moq: "10 kg",
        supplier: "PharmaChem GmbH",
        country: "🇨🇭 Switzerland",
        verified: true,
        rating: 4.9,
        trend: "+11.5%"
      },
      {
        id: 15,
        name: "Agricultural Fertilizers",
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=600&q=80",
        category: "Chemicals",
        price: "$890",
        moq: "1 ton",
        supplier: "AgroChem Industries",
        country: "🇧🇷 Brazil",
        verified: true,
        rating: 4.7,
        trend: "+8.9%"
      }
    ],
    suppliers: [
      {
        name: "ChemWorld Corp",
        country: "USA",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80",
        verified: true,
        yearsActive: 40,
        rating: 4.9,
        products: "8,234",
        responseTime: "< 3 hours",
        specialization: "Industrial Chemicals"
      },
      {
        name: "PharmaChem GmbH",
        country: "Switzerland",
        flag: "🇨🇭",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=200&q=80",
        verified: true,
        yearsActive: 55,
        rating: 4.9,
        products: "4,567",
        responseTime: "< 2 hours",
        specialization: "Pharmaceuticals"
      },
      {
        name: "AgroChem Industries",
        country: "Brazil",
        flag: "🇧🇷",
        image: "https://images.unsplash.com/photo-1581092334247-d06d9dc2f3ad?w=200&q=80",
        verified: true,
        yearsActive: 22,
        rating: 4.7,
        products: "6,789",
        responseTime: "< 4 hours",
        specialization: "Agricultural Chemicals"
      }
    ],
    liveActivity: [
      { action: "Bulk order shipped", detail: "50 tons fertilizer", from: "India", time: "2 min ago" },
      { action: "New certification", detail: "ISO 9001 awarded", from: "Switzerland", time: "15 min ago" },
      { action: "RFQ published", detail: "Pharma ingredients", from: "UK", time: "20 min ago" }
    ]
  },
  {
    id: "home-decor",
    name: "Home Decor",
    icon: Home,
    color: "teal",
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-500/20 to-cyan-500/20",
    stats: {
      activeSuppliers: "42,567",
      productsListed: "10,234,567",
      dailyShipments: "234,567",
      tradeVolume: "$5.8B",
      activeBuyers: "3.5M",
      dailyRFQs: "12,000",
      avgResponse: "1.9 hrs",
      tradeAssurance: "$30M"
    },
    products: [
      {
        id: 16,
        name: "Handcrafted Ceramic Vases",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
        category: "Home Decor",
        price: "$45",
        moq: "50 units",
        supplier: "ArtisanCraft Morocco",
        country: "🇲🇦 Morocco",
        verified: true,
        rating: 4.8,
        trend: "+25.6%"
      },
      {
        id: 17,
        name: "Modern LED Light Fixtures",
        image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80",
        category: "Home Decor",
        price: "$89",
        moq: "100 units",
        supplier: "LightDesign Italy",
        country: "🇮🇹 Italy",
        verified: true,
        rating: 4.9,
        trend: "+14.3%"
      },
      {
        id: 18,
        name: "Bamboo Furniture Set",
        image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80",
        category: "Home Decor",
        price: "$599",
        moq: "10 sets",
        supplier: "EcoFurn Vietnam",
        country: "🇻🇳 Vietnam",
        verified: true,
        rating: 4.7,
        trend: "+19.8%"
      }
    ],
    suppliers: [
      {
        name: "ArtisanCraft Morocco",
        country: "Morocco",
        flag: "🇲🇦",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=80",
        verified: true,
        yearsActive: 15,
        rating: 4.8,
        products: "3,456",
        responseTime: "< 2 hours",
        specialization: "Handcrafted Items"
      },
      {
        name: "LightDesign Italy",
        country: "Italy",
        flag: "🇮🇹",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=200&q=80",
        verified: true,
        yearsActive: 30,
        rating: 4.9,
        products: "5,678",
        responseTime: "< 1 hour",
        specialization: "Lighting Solutions"
      },
      {
        name: "EcoFurn Vietnam",
        country: "Vietnam",
        flag: "🇻🇳",
        image: "https://images.unsplash.com/photo-1581092334247-d06d9dc2f3ad?w=200&q=80",
        verified: true,
        yearsActive: 8,
        rating: 4.7,
        products: "2,345",
        responseTime: "< 3 hours",
        specialization: "Sustainable Furniture"
      }
    ],
    liveActivity: [
      { action: "New collection", detail: "Summer decor 2026", from: "Morocco", time: "5 min ago" },
      { action: "Bulk order", detail: "Ceramic vases", from: "France", time: "8 min ago" },
      { action: "Trending now", detail: "Bamboo furniture", from: "Vietnam", time: "12 min ago" }
    ]
  }
]

// PRE-DEFINED COLOR MAPPINGS (to fix Tailwind JIT issues)
const colorMappings = {
  electronics: {
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500",
    borderColor: "border-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/50",
    iconColor: "text-blue-500",
    badgeGradient: "from-blue-600 to-cyan-600",
    dotColor: "bg-blue-500",
    statColor: "text-blue-500"
  },
  machinery: {
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-500/20 to-green-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500",
    borderColor: "border-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/50",
    iconColor: "text-emerald-500",
    badgeGradient: "from-emerald-600 to-green-600",
    dotColor: "bg-emerald-500",
    statColor: "text-emerald-500"
  },
  fashion: {
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/20 to-rose-500/20",
    textColor: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-500",
    borderColor: "border-pink-500",
    lightBg: "bg-pink-50 dark:bg-pink-950/50",
    iconColor: "text-pink-500",
    badgeGradient: "from-pink-600 to-rose-600",
    dotColor: "bg-pink-500",
    statColor: "text-pink-500"
  },
  packaging: {
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/20 to-orange-500/20",
    textColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500",
    borderColor: "border-amber-500",
    lightBg: "bg-amber-50 dark:bg-amber-950/50",
    iconColor: "text-amber-500",
    badgeGradient: "from-amber-600 to-orange-600",
    dotColor: "bg-amber-500",
    statColor: "text-amber-500"
  },
  chemicals: {
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-500/20 to-violet-500/20",
    textColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500",
    borderColor: "border-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/50",
    iconColor: "text-purple-500",
    badgeGradient: "from-purple-600 to-violet-600",
    dotColor: "bg-purple-500",
    statColor: "text-purple-500"
  },
  "home-decor": {
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-500/20 to-cyan-500/20",
    textColor: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-500",
    borderColor: "border-teal-500",
    lightBg: "bg-teal-50 dark:bg-teal-950/50",
    iconColor: "text-teal-500",
    badgeGradient: "from-teal-600 to-cyan-600",
    dotColor: "bg-teal-500",
    statColor: "text-teal-500"
  }
}

// Product card component to prevent re-renders
const ProductCard = ({ product, colors, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mb-3 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 backdrop-blur-xl text-white">
              {product.category}
            </Badge>
            {product.verified && (
              <Badge className="bg-green-500/20 backdrop-blur-xl text-green-300">
                <Verified className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <h4 className="mb-2 font-semibold">{product.name}</h4>
      
      <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
        <span className={`font-bold ${colors.textColor}`}>
          {product.price}
        </span>
        <span>•</span>
        <span>MOQ: {product.moq}</span>
        <Badge variant="secondary" className="ml-auto text-xs text-green-500">
          <TrendingUp className="mr-1 h-3 w-3" />
          {product.trend}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <div className="flex items-center gap-1">
          <span>{product.country}</span>
          <span>•</span>
          <span className="truncate">{product.supplier}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{product.rating}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Supplier card component
const SupplierCard = ({ supplier }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 transition-all hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
    >
      <img
        src={supplier.image}
        alt={supplier.name}
        className="h-12 w-12 rounded-lg object-cover"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold truncate">{supplier.name}</span>
          <span>{supplier.flag}</span>
          {supplier.verified && (
            <Verified className="h-3 w-3 text-blue-500 flex-shrink-0" />
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
          <span>{supplier.yearsActive}y</span>
          <span>•</span>
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{supplier.rating}</span>
          <span>•</span>
          <span className="truncate">{supplier.specialization}</span>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-zinc-400 flex-shrink-0" />
    </motion.div>
  )
}

// Stat item component
const StatItem = ({ stat, colors }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-700"
    >
      <div className="flex items-center gap-3">
        <stat.icon className={`h-5 w-5 ${stat.color}`} />
        <div>
          <div className="text-sm text-zinc-500">{stat.label}</div>
          <div className="text-lg font-bold">{stat.value}</div>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-zinc-400" />
    </motion.div>
  )
}

// Activity item component
const ActivityItem = ({ activity, colors }) => {
  return (
    <motion.div className="flex items-start gap-3 rounded-lg border border-zinc-200 p-2 dark:border-zinc-700">
      <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${colors.dotColor}`} />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium">{activity.action}</div>
        <div className="text-xs text-zinc-500">{activity.detail}</div>
        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
          <Globe className="h-3 w-3" />
          <span>{activity.from}</span>
          <span>•</span>
          <span>{activity.time}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  const [activeCategory, setActiveCategory] = useState("electronics")
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Memoize active data to prevent unnecessary recalculations
  const activeData = useMemo(() => 
    categories.find(cat => cat.id === activeCategory),
    [activeCategory]
  )
  
  const colors = useMemo(() => 
    colorMappings[activeCategory],
    [activeCategory]
  )
  
  const currentProduct = activeData?.products[currentProductIndex]

  // Auto-rotate products with cleanup
  useEffect(() => {
    if (!isPaused && activeData && !isTransitioning) {
      const interval = setInterval(() => {
        setCurrentProductIndex((prev) => (prev + 1) % activeData.products.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPaused, activeCategory, activeData, isTransitioning])

  // Reset product index on category change smoothly
  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return
    
    setIsTransitioning(true)
    setActiveCategory(categoryId)
    setCurrentProductIndex(0)
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  if (!activeData || !colors) return null

  const statItems = [
    { label: "Active Suppliers", value: activeData.stats.activeSuppliers, icon: Factory, color: "text-blue-500" },
    { label: "Products Listed", value: activeData.stats.productsListed, icon: Package, color: "text-purple-500" },
    { label: "Daily Shipments", value: activeData.stats.dailyShipments, icon: Truck, color: "text-emerald-500" },
    { label: "Trade Volume", value: activeData.stats.tradeVolume, icon: DollarSign, color: "text-amber-500" },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Static Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Animated gradient orbs - separate from content */}
        <div className={`absolute -top-40 -right-40 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-r ${colors.bgGradient} blur-[120px] transition-all duration-700`} />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 pt-24 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-2 backdrop-blur-xl dark:border-blue-800 dark:bg-blue-950/50">
            <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              🚀 AI-Powered Global Trade Platform
            </span>
            <ChevronRight className="h-4 w-4 text-blue-500" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-center"
        >
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-8xl">
            <span className="block">Source Globally,</span>
            <span className={`mt-2 block bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent transition-all duration-500`}>
              Trade Intelligently
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Connect with {activeData.stats.activeSuppliers} verified suppliers across 190 countries. 
            AI-powered matchmaking, secure payments, and end-to-end logistics.
          </p>
        </motion.div>

        {/* AI Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-6 max-w-3xl"
        >
          <div className="relative">
            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${colors.gradient} opacity-50 blur-lg transition-all duration-500`} />
            <div className="relative rounded-2xl border border-zinc-200 bg-white/80 p-1.5 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 px-2">
                    <Search className="h-5 w-5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder={`Search in ${activeData.name}...`}
                      className="w-full bg-transparent py-3 text-base outline-none placeholder:text-zinc-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="lg" className={`bg-gradient-to-r ${colors.badgeGradient} hover:opacity-90 transition-all`}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.slice(0, showAllCategories ? categories.length : 6).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`relative flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? `border-transparent bg-gradient-to-r ${colorMappings[category.id].gradient} text-white shadow-lg shadow-${colorMappings[category.id].bgColor}/25`
                    : "border-zinc-200 bg-white/80 text-zinc-600 backdrop-blur-xl hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="whitespace-nowrap rounded-full border border-zinc-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-zinc-600 backdrop-blur-xl hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:border-zinc-600 transition-all"
            >
              {showAllCategories ? "Show Less −" : "+ More Categories"}
            </button>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left Column - Product Showcase */}
          <div
            className="space-y-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Featured {activeData.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {currentProductIndex + 1}/{activeData.products.length}
                </Badge>
              </div>
              
              {/* Product display with smooth transitions */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <ProductCard 
                    key={currentProduct?.id} 
                    product={currentProduct} 
                    colors={colors}
                  />
                </AnimatePresence>
              </div>
              
              {/* Progress Dots */}
              <div className="mt-4 flex justify-center gap-1.5">
                {activeData.products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProductIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentProductIndex
                        ? `w-6 ${colors.bgColor}`
                        : "w-1.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>
              
              <Button variant="outline" className="mt-4 w-full group" size="sm">
                View All {activeData.name} Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Center Column - Live Stats */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">{activeData.name} Statistics</h3>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-green-500">Live</span>
                </div>
              </div>
              
              <div className="space-y-2.5">
                {statItems.map((stat, index) => (
                  <div key={stat.label}>
                    <StatItem stat={stat} colors={colors} />
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Trade Secure", color: "text-green-500" },
                { icon: Award, label: "Verified", color: colors.iconColor },
                { icon: Clock, label: activeData.stats.avgResponse, color: "text-purple-500" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-xl border border-zinc-200 bg-white/80 p-3 text-center backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80"
                >
                  <badge.icon className={`mx-auto h-5 w-5 ${badge.color}`} />
                  <div className="mt-1 text-xs font-medium">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Suppliers & Activity */}
          <div className="space-y-4">
            {/* Top Suppliers */}
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Top Suppliers</h3>
                <Badge variant="secondary" className="text-xs gap-1">
                  <Verified className="h-3 w-3" />
                  Verified
                </Badge>
              </div>
              
              <div className="space-y-2.5">
                {activeData.suppliers.map((supplier, index) => (
                  <div key={supplier.name}>
                    <SupplierCard supplier={supplier} />
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="mt-4 w-full group" size="sm">
                View All {activeData.stats.activeSuppliers} Suppliers
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Live Activity Feed */}
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Live Activity</h3>
                <div className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </div>
              
              <div className="space-y-2.5">
                {activeData.liveActivity.map((activity, index) => (
                  <div key={index}>
                    <ActivityItem activity={activity} colors={colors} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 rounded-2xl border border-zinc-200 bg-white/80 p-5 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { label: "Active Buyers", value: activeData.stats.activeBuyers, icon: Users },
              { label: "Daily RFQs", value: activeData.stats.dailyRFQs, icon: TrendingUp },
              { label: "Avg. Response Time", value: activeData.stats.avgResponse, icon: Clock },
              { label: "Trade Assurance", value: activeData.stats.tradeAssurance, icon: Shield },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon className={`h-5 w-5 ${colors.iconColor}`} />
                <div>
                  <div className="text-lg font-bold">{item.value}</div>
                  <div className="text-xs text-zinc-500">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}