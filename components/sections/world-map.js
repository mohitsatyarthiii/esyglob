// components/sections/world-map.js
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { 
  Globe, 
  MapPin, 
  Ship, 
  Plane, 
  Truck, 
  Factory, 
  Users,
  Package,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign,
  Anchor,
  Navigation,
  Radio,
  Wifi,
  Satellite,
  Zap,
  Building2,
  Store,
  ShoppingCart,
  BadgeCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// Trade route data with coordinates (x%, y% for positioning)
const tradeRoutes = [
  { id: 1, from: "Shanghai", to: "Los Angeles", fromCoords: [78, 38], toCoords: [12, 35], status: "active", type: "sea", volume: "$2.4M", shipments: 342 },
  { id: 2, from: "Shenzhen", to: "Rotterdam", fromCoords: [77, 40], toCoords: [48, 28], status: "active", type: "sea", volume: "$1.8M", shipments: 256 },
  { id: 3, from: "Tokyo", to: "San Francisco", fromCoords: [82, 32], toCoords: [10, 33], status: "active", type: "air", volume: "$3.2M", shipments: 189 },
  { id: 4, from: "Mumbai", to: "Dubai", fromCoords: [65, 45], toCoords: [58, 42], status: "active", type: "sea", volume: "$890K", shipments: 145 },
  { id: 5, from: "Singapore", to: "London", fromCoords: [72, 48], toCoords: [45, 25], status: "active", type: "air", volume: "$1.5M", shipments: 201 },
  { id: 6, from: "Hamburg", to: "New York", fromCoords: [47, 27], toCoords: [22, 32], status: "active", type: "sea", volume: "$2.1M", shipments: 178 },
  { id: 7, from: "Seoul", to: "Sydney", fromCoords: [80, 35], toCoords: [85, 68], status: "active", type: "air", volume: "$950K", shipments: 134 },
  { id: 8, from: "Istanbul", to: "Lagos", fromCoords: [52, 35], toCoords: [48, 52], status: "active", type: "sea", volume: "$670K", shipments: 98 },
]

// Supplier locations
const supplierLocations = [
  { id: 1, city: "Shenzhen", country: "China", coords: [77, 40], count: "45,892", icon: Factory, color: "bg-blue-500" },
  { id: 2, city: "Stuttgart", country: "Germany", coords: [47, 28], count: "12,345", icon: Factory, color: "bg-green-500" },
  { id: 3, city: "Tokyo", country: "Japan", coords: [82, 32], count: "8,921", icon: Factory, color: "bg-purple-500" },
  { id: 4, city: "Mumbai", country: "India", coords: [65, 45], count: "34,567", icon: Factory, color: "bg-amber-500" },
  { id: 5, city: "Houston", country: "USA", coords: [20, 38], count: "6,789", icon: Factory, color: "bg-red-500" },
  { id: 6, city: "Seoul", country: "South Korea", coords: [80, 35], count: "15,432", icon: Factory, color: "bg-cyan-500" },
  { id: 7, city: "Istanbul", country: "Turkey", coords: [52, 35], count: "11,234", icon: Factory, color: "bg-pink-500" },
  { id: 8, city: "São Paulo", country: "Brazil", coords: [32, 60], count: "9,876", icon: Factory, color: "bg-emerald-500" },
]

// Active ports
const activePorts = [
  { id: 1, name: "Shanghai", country: "China", coords: [78, 38], volume: "42M TEU", rank: 1, icon: Anchor },
  { id: 2, name: "Singapore", country: "Singapore", coords: [72, 48], volume: "37M TEU", rank: 2, icon: Anchor },
  { id: 3, name: "Rotterdam", country: "Netherlands", coords: [48, 28], volume: "15M TEU", rank: 3, icon: Anchor },
  { id: 4, name: "Los Angeles", country: "USA", coords: [12, 35], volume: "10M TEU", rank: 4, icon: Anchor },
  { id: 5, name: "Dubai", country: "UAE", coords: [58, 42], volume: "14M TEU", rank: 5, icon: Anchor },
  { id: 6, name: "Hamburg", country: "Germany", coords: [47, 27], volume: "9M TEU", rank: 6, icon: Anchor },
]

// Live shipment data
const liveShipments = [
  { id: 1, from: "Shanghai → LA", coords: [45, 36], type: "sea", progress: 65, vessel: "MSC Anna", eta: "2 days" },
  { id: 2, from: "Tokyo → SF", coords: [46, 32], type: "air", progress: 40, vessel: "NH8421", eta: "6 hours" },
  { id: 3, from: "Singapore → London", coords: [58, 36], type: "air", progress: 75, vessel: "SQ321", eta: "4 hours" },
  { id: 4, from: "Mumbai → Dubai", coords: [61, 43], type: "sea", progress: 30, vessel: "CMA CGM", eta: "5 days" },
  { id: 5, from: "Shenzhen → Rotterdam", coords: [62, 34], type: "sea", progress: 50, vessel: "Maersk Line", eta: "12 days" },
]

// Stats for the map
const globalStats = [
  { label: "Active Shipments", value: "847,231", icon: Package, color: "text-blue-400", change: "+12.5%" },
  { label: "Online Suppliers", value: "56,782", icon: Factory, color: "text-green-400", change: "+5.2%" },
  { label: "Active Buyers", value: "10.5M", icon: Users, color: "text-purple-400", change: "+8.7%" },
  { label: "Ports Connected", value: "850+", icon: Anchor, color: "text-amber-400", change: "+2.1%" },
]

// Animated pulse dot component
const PulseDot = ({ x, y, color, size = "small", label, value, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: Math.random() * 0.5, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Outer pulse */}
      <motion.div
        className={`absolute -inset-3 rounded-full ${color} opacity-30`}
        animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Inner pulse */}
      <motion.div
        className={`absolute -inset-1.5 rounded-full ${color} opacity-50`}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      
      {/* Center dot */}
      <div className={`relative h-${size === "large" ? "4" : "3"} w-${size === "large" ? "4" : "3"} rounded-full ${color} shadow-lg cursor-pointer hover:scale-150 transition-transform`} />
      
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-3 min-w-[180px] z-50"
          >
            <div className="text-sm font-semibold mb-1">{label}</div>
            {value && <div className="text-lg font-bold text-blue-600">{value}</div>}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Animated shipping route line
const RouteLine = ({ from, to, status, type }) => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 0.3) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const fromX = from[0]
  const fromY = from[1]
  const toX = to[0]
  const toY = to[1]
  
  const midX = (fromX + toX) / 2
  const midY = Math.min(fromY, toY) - 8
  
  const pathD = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {/* Glow line */}
      <path
        d={pathD}
        fill="none"
        stroke={type === "air" ? "rgba(147, 51, 234, 0.3)" : "rgba(59, 130, 246, 0.3)"}
        strokeWidth="3"
        strokeLinecap="round"
        className="blur-sm"
      />
      
      {/* Main line */}
      <path
        d={pathD}
        fill="none"
        stroke={type === "air" ? "rgba(147, 51, 234, 0.6)" : "rgba(59, 130, 246, 0.6)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
        strokeDashoffset={-progress * 2}
      />
      
      {/* Moving dot */}
      <motion.circle
        r="3"
        fill={type === "air" ? "#a855f7" : "#3b82f6"}
        filter="url(#glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path={pathD}
        />
      </motion.circle>
      
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

export function WorldMap() {
  const [activeTab, setActiveTab] = useState("shipments")
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mapRef = useRef(null)

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Starfield background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm backdrop-blur-xl border border-white/10">
            <Globe className="mr-2 h-4 w-4" />
            Live Global Trade Network
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Connected Worldwide
            </span>
            <span className="text-white"> in Real-Time</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Track live shipments, connect with suppliers, and monitor global trade activity across 850+ ports.
          </p>
        </motion.div>

        {/* Global Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {globalStats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <Badge className="bg-green-500/20 text-green-400 text-[10px] border-0">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Map Container */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden shadow-2xl"
        >
          {/* World Map Background */}
          <div className="relative aspect-[2/1] min-h-[500px]">
            {/* Map SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 60">
              {/* Simplified world map paths */}
              <path d="M10,20 Q20,15 30,20 Q35,18 40,22 L45,20 Q50,25 55,20 L60,22 Q65,18 70,20 L75,18 Q80,22 85,20 L90,25" 
                fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3"/>
              <path d="M8,25 Q15,22 25,28 Q35,30 45,28 L50,30 Q55,25 60,28 L65,25 Q70,30 75,28 L80,30 Q85,25 90,28" 
                fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3"/>
              <path d="M15,35 Q20,30 25,35 Q30,32 35,38 L40,35 Q45,38 50,35 L55,38 Q60,32 65,35 L70,38 Q75,32 80,35" 
                fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3"/>
              <path d="M5,40 Q10,38 15,42 Q20,40 25,45 L30,42 Q35,45 40,42 L45,45 Q50,40 55,42" 
                fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3"/>
              <path d="M20,48 Q25,45 30,48 Q35,45 40,50 Q45,46 50,50 L55,48 Q60,50 65,48" 
                fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3"/>
              <path d="M75,42 Q80,40 85,45 L88,42" 
                fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3"/>
              
              {/* Grid lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 6} x2="100" y2={i * 6} stroke="rgba(255,255,255,0.05)" strokeWidth="0.1" />
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 7} y1="0" x2={i * 7} y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.1" />
              ))}
            </svg>

            {/* Trade Routes */}
            {activeTab === "shipments" && tradeRoutes.map((route) => (
              <RouteLine key={route.id} from={route.fromCoords} to={route.toCoords} type={route.type} />
            ))}

            {/* Supplier Locations */}
            {activeTab === "suppliers" && supplierLocations.map((loc) => (
              <PulseDot
                key={loc.id}
                x={loc.coords[0]}
                y={loc.coords[1]}
                color={loc.color}
                size="large"
                label={`${loc.city}, ${loc.country}`}
                value={`${loc.count} suppliers`}
                onClick={() => setSelectedLocation(loc)}
              />
            ))}

            {/* Active Ports */}
            {activeTab === "ports" && activePorts.map((port) => (
              <PulseDot
                key={port.id}
                x={port.coords[0]}
                y={port.coords[1]}
                color="bg-amber-500"
                size="large"
                label={`Port of ${port.name}`}
                value={`${port.volume}/year`}
                onClick={() => setSelectedLocation(port)}
              />
            ))}

            {/* Live Shipments */}
            {activeTab === "shipments" && liveShipments.map((ship) => (
              <PulseDot
                key={ship.id}
                x={ship.coords[0]}
                y={ship.coords[1]}
                color={ship.type === "air" ? "bg-purple-500" : "bg-blue-500"}
                label={ship.from}
                value={`ETA: ${ship.eta}`}
              />
            ))}
          </div>

          {/* Bottom Panel */}
          <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl p-4">
            {/* Tab Selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { id: "shipments", label: "Active Shipments", icon: Ship, count: "12,847" },
                { id: "suppliers", label: "Supplier Hubs", icon: Factory, count: "245K" },
                { id: "ports", label: "Major Ports", icon: Anchor, count: "850+" },
                { id: "buyers", label: "Buyer Regions", icon: Users, count: "10M" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-white/5 text-zinc-400 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  <Badge className="bg-white/10 text-white text-[10px] border-0">{tab.count}</Badge>
                </button>
              ))}
            </div>

            {/* Live Feed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeTab === "shipments" && liveShipments.slice(0, 3).map((ship) => (
                <div key={ship.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${ship.type === "air" ? "bg-purple-500/20" : "bg-blue-500/20"}`}>
                    {ship.type === "air" ? <Plane className="h-5 w-5 text-purple-400" /> : <Ship className="h-5 w-5 text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{ship.from}</div>
                    <div className="text-xs text-zinc-500">{ship.vessel} • ETA: {ship.eta}</div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 text-[10px]">Active</Badge>
                </div>
              ))}

              {activeTab === "suppliers" && supplierLocations.slice(0, 3).map((loc) => (
                <div key={loc.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${loc.color.replace('bg-', 'bg-')}/20`}>
                    <Factory className={`h-5 w-5 ${loc.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{loc.city}, {loc.country}</div>
                    <div className="text-xs text-zinc-500">{loc.count} verified suppliers</div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 text-[10px]">Hub</Badge>
                </div>
              ))}

              {activeTab === "ports" && activePorts.slice(0, 3).map((port) => (
                <div key={port.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                    <Anchor className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{port.name}, {port.country}</div>
                    <div className="text-xs text-zinc-500">Rank #{port.rank} • {port.volume}</div>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">Top {port.rank}</Badge>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Button size="lg" className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25">
            <Globe className="mr-2 h-5 w-5" />
            Explore Global Trade Network
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}