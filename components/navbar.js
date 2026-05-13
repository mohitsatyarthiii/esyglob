// components/navbar.js - FIXED WITH WORKING MOBILE MENU
"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Bell, 
  Heart, 
  ChevronDown, 
  Menu,
  X,
  Sparkles,
  Globe,
  Zap,
  TrendingUp,
  Shield,
  Cpu,
  Package,
  ArrowRight,
  User,
  LogIn,
  Rocket,
  Building2,
  Factory,
  Verified,
  BadgeCheck,
  Truck,
  HeadphonesIcon,
  Smartphone,
  Tag,
  Briefcase,
  FileText,
  ClipboardCheck,
  CreditCard,
  DollarSign,
  MessageSquare,
  BarChart3,
  Star,
  Crown,
  Gift,
  HelpCircle,
  Settings,
  LogOut,
  ShoppingCart,
  LayoutGrid,
  Compass,
  MessageCircle,
  Store,
  UserCircle,
  ChevronRight,
  Home,
  ShoppingBag,
  BadgePercent,
  Headphones,
  LifeBuoy,
  BookOpen,
  FileQuestion,
  Users,
  Award,
  Clock,
  MapPin,
  Phone, Trophy, Car, Beaker
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// Mega menu data structure
const megaMenuData = {
  categories: {
    title: "All Categories",
    icon: LayoutGrid,
    description: "Browse millions of products across industries",
    featured: [
      { icon: Cpu, label: "Electronics & Telecom", href: "/categories/electronics", items: ["Smartphones", "Laptops", "LED Displays", "IoT Devices"] },
      { icon: Factory, label: "Machinery & Industrial", href: "/categories/machinery", items: ["CNC Machines", "Robotics", "Packaging Lines", "3D Printers"] },
      { icon: Package, label: "Packaging & Printing", href: "/categories/packaging", items: ["Boxes", "Labels", "Plastic Containers", "Bags"] },
    ],
    quickLinks: [
      { label: "Fashion & Apparel", href: "/categories/fashion", icon: Sparkles },
      { label: "Home & Garden", href: "/categories/home", icon: Home },
      { label: "Beauty & Personal Care", href: "/categories/beauty", icon: Star },
      { label: "Sports & Entertainment", href: "/categories/sports", icon: Trophy },
      { label: "Automotive", href: "/categories/automotive", icon: Car },
      { label: "Chemicals", href: "/categories/chemicals", icon: Beaker },
    ]
  },
  verified: {
    title: "Verified Manufacturers",
    icon: BadgeCheck,
    description: "Connect with pre-vetted, trusted suppliers",
    stats: [
      { label: "Verified Suppliers", value: "45,892", icon: Verified },
      { label: "Factory Audits", value: "128,456", icon: Factory },
      { label: "On-time Delivery", value: "98.5%", icon: Truck },
    ],
    features: [
      { icon: BadgeCheck, label: "Gold Supplier", desc: "Premium verified manufacturers" },
      { icon: Factory, label: "Factory Tour", desc: "Virtual & in-person inspections" },
      { icon: Shield, label: "Trade Assurance", desc: "Payment protection guarantee" },
    ]
  },
  protection: {
    title: "Order Protections",
    icon: Shield,
    description: "Your orders are protected from payment to delivery",
    guarantees: [
      { icon: CreditCard, label: "Payment Protection", desc: "Money back guarantee" },
      { icon: Truck, label: "Shipping Protection", desc: "On-time delivery guarantee" },
      { icon: BadgeCheck, label: "Quality Guarantee", desc: "Product quality assured" },
    ]
  },
  services: {
    title: "Services",
    icon: Briefcase,
    items: [
      { icon: Truck, label: "Logistics & Shipping", href: "/services/logistics" },
      { icon: DollarSign, label: "Trade Financing", href: "/services/finance" },
      { icon: MessageSquare, label: "AI Negotiation", href: "/services/ai-negotiation" },
      { icon: BarChart3, label: "Market Insights", href: "/services/insights" },
      { icon: Globe, label: "Translation", href: "/services/translation" },
      { icon: ClipboardCheck, label: "Customs Clearance", href: "/services/customs" },
    ]
  }
}

// Mobile menu sections
const mobileMenuSections = [
  {
    title: "Main Navigation",
    items: [
      { icon: LayoutGrid, label: "All Categories", href: "/categories", badge: "New" },
      { icon: BadgeCheck, label: "Verified Manufacturers", href: "/verified-suppliers" },
      { icon: Shield, label: "Order Protections", href: "/protection" },
      { icon: Briefcase, label: "Services", href: "/services" },
      { icon: Tag, label: "Tax Exemption", href: "/tax-exemption" },
      { icon: User, label: "Buyer Central", href: "/buyer-central" },
    ]
  },
  {
    title: "Tools & Apps",
    items: [
      { icon: Smartphone, label: "Mobile App", href: "/app" },
      { icon: MessageCircle, label: "AI Assistant", href: "/ai-assistant" },
      { icon: BarChart3, label: "Market Analytics", href: "/analytics" },
      { icon: ShoppingBag, label: "My Orders", href: "/orders" },
    ]
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", href: "/help" },
      { icon: BookOpen, label: "Documentation", href: "/docs" },
      { icon: Headphones, label: "24/7 Support", href: "/support" },
      { icon: FileQuestion, label: "FAQ", href: "/faq" },
    ]
  }
]

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState(null)
  const [notificationCount] = useState(3)
  const [wishlistCount] = useState(5)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedMobileSection, setExpandedMobileSection] = useState(null)
  const megaMenuRef = useRef(null)
  const closeTimeoutRef = useRef(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle click outside for mega menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setActiveMegaMenu(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleMegaMenuEnter = (menu) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setActiveMegaMenu(menu)
  }

  const handleMegaMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 200)
  }

  const quickActions = [
    { icon: Bell, label: "Notifications", count: notificationCount, href: "/notifications" },
    { icon: Heart, label: "Wishlist", count: wishlistCount, href: "/wishlist" },
    { icon: ShoppingCart, label: "Orders", count: 0, href: "/orders" },
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 hidden lg:block"
      >
        <nav className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "relative mt-4 transition-all duration-300",
            scrolled 
              ? "rounded-2xl border border-white/10 bg-white/40 shadow-2xl backdrop-blur-2xl dark:border-white/5 dark:bg-black/40"
              : "rounded-2xl border border-white/10 bg-white/20 shadow-xl backdrop-blur-xl dark:border-white/5 dark:bg-black/20"
          )}>
            <div className="flex h-[72px] items-center justify-between px-6">
              {/* Logo Section */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 blur-lg group-hover:blur-xl transition-all" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>
                
              </Link>

              {/* Main Navigation Links */}
              <div className="hidden xl:flex items-center gap-1">
                {[
                  { label: "All Categories", icon: LayoutGrid, menu: "categories" },
                  { label: "Verified Manufacturers", icon: BadgeCheck, menu: "verified" },
                  { label: "Order Protections", icon: Shield, menu: "protection" },
                  { label: "Services", icon: Briefcase, menu: "services" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMegaMenuEnter(item.menu)}
                    onMouseLeave={handleMegaMenuLeave}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                        activeMegaMenu === item.menu
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      <ChevronDown className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        activeMegaMenu === item.menu && "rotate-180"
                      )} />
                    </button>
                  </div>
                ))}

                {/* Additional Quick Links */}
                <Link
                  href="/tax-exemption"
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 transition-all"
                >
                  <Tag className="h-4 w-4" />
                  Tax Exemption
                </Link>

                <Link
                  href="/buyer-central"
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 transition-all"
                >
                  <User className="h-4 w-4" />
                  Buyer Central
                </Link>

                
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-2">
                {/* Search Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* Quick Actions */}
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="relative rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all"
                  >
                    <action.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    {action.count > 0 && (
                      <Badge className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0 text-[10px]">
                        {action.count}
                      </Badge>
                    )}
                  </Link>
                ))}

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Auth Buttons */}
                <div className="flex items-center gap-2 ml-2">
                  <Button variant="ghost" size="sm" className="rounded-xl text-sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                  <Button 
                    size="sm" 
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-sm hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    Start Selling
                  </Button>
                </div>
              </div>
            </div>

            {/* Search Overlay */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-zinc-200 dark:border-zinc-700/50 px-6 py-4"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-lg" />
                    <div className="relative flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900">
                      <Search className="ml-3 h-5 w-5 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="AI-powered search across all categories..."
                        className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-zinc-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <kbd className="mr-2 rounded-lg bg-zinc-100 px-2 py-1 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        ⌘K
                      </kbd>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mega Menus */}
          <AnimatePresence>
            {activeMegaMenu && (
              <motion.div
                ref={megaMenuRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-4 right-4 top-full mt-2"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current)
                  }
                }}
                onMouseLeave={handleMegaMenuLeave}
              >
                <div className="mx-auto max-w-[1400px]">
                  <div className="rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-2xl dark:border-white/5 dark:bg-zinc-900/95">
                    {/* Categories Mega Menu */}
                    {activeMegaMenu === "categories" && (
                      <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2">
                          <div className="flex items-center gap-2 mb-4">
                            <LayoutGrid className="h-5 w-5 text-blue-500" />
                            <h3 className="text-lg font-semibold">Featured Categories</h3>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {megaMenuData.categories.featured.map((cat) => (
                              <Link
                                key={cat.label}
                                href={cat.href}
                                className="group rounded-xl border border-zinc-200 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50 dark:border-zinc-700 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                              >
                                <cat.icon className="h-8 w-8 text-blue-500 mb-3" />
                                <h4 className="font-semibold text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                  {cat.label}
                                </h4>
                                <div className="space-y-1">
                                  {cat.items.map((item) => (
                                    <div key={item} className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Zap className="h-5 w-5 text-amber-500" />
                            <h3 className="text-lg font-semibold">Quick Links</h3>
                          </div>
                          <div className="space-y-2">
                            {megaMenuData.categories.quickLinks.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                className="flex items-center gap-3 rounded-lg p-3 text-sm transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              >
                                <link.icon className="h-4 w-4 text-zinc-500" />
                                <span>{link.label}</span>
                                <ArrowRight className="ml-auto h-3 w-3 text-zinc-400" />
                              </Link>
                            ))}
                          </div>
                          
                          <Link
                            href="/categories"
                            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-3 text-sm font-medium text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                          >
                            View All Categories
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Verified Manufacturers Mega Menu */}
                    {activeMegaMenu === "verified" && (
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <BadgeCheck className="h-6 w-6 text-green-500" />
                          <h3 className="text-xl font-semibold">Verified Manufacturers</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {megaMenuData.verified.stats.map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-zinc-200 p-4 text-center dark:border-zinc-700">
                              <stat.icon className="mx-auto h-8 w-8 text-green-500 mb-2" />
                              <div className="text-2xl font-bold">{stat.value}</div>
                              <div className="text-sm text-zinc-500">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {megaMenuData.verified.features.map((feature) => (
                            <Link
                              key={feature.label}
                              href="#"
                              className="flex items-start gap-3 rounded-xl border border-zinc-200 p-4 transition-all hover:border-green-200 dark:border-zinc-700 dark:hover:border-green-800"
                            >
                              <feature.icon className="h-6 w-6 text-green-500 mt-1" />
                              <div>
                                <h4 className="font-semibold text-sm">{feature.label}</h4>
                                <p className="text-xs text-zinc-500 mt-1">{feature.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Order Protections Mega Menu */}
                    {activeMegaMenu === "protection" && (
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <Shield className="h-6 w-6 text-blue-500" />
                          <h3 className="text-xl font-semibold">Order Protections</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {megaMenuData.protection.guarantees.map((guarantee) => (
                            <Link
                              key={guarantee.label}
                              href="#"
                              className="rounded-xl border border-zinc-200 p-6 text-center transition-all hover:border-blue-200 hover:bg-blue-50/50 dark:border-zinc-700 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                            >
                              <guarantee.icon className="mx-auto h-10 w-10 text-blue-500 mb-3" />
                              <h4 className="font-semibold mb-1">{guarantee.label}</h4>
                              <p className="text-sm text-zinc-500">{guarantee.desc}</p>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-950/30 dark:to-purple-950/30">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Crown className="h-5 w-5 text-amber-500" />
                                <span className="font-semibold">Trade Assurance</span>
                              </div>
                              <p className="text-sm text-zinc-500 mt-1">Get paid protection on every order</p>
                            </div>
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Services Mega Menu */}
                    {activeMegaMenu === "services" && (
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <Briefcase className="h-6 w-6 text-purple-500" />
                          <h3 className="text-xl font-semibold">Our Services</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {megaMenuData.services.items.map((service) => (
                            <Link
                              key={service.label}
                              href={service.href}
                              className="flex items-start gap-3 rounded-xl border border-zinc-200 p-4 transition-all hover:border-purple-200 hover:bg-purple-50/50 dark:border-zinc-700 dark:hover:border-purple-800 dark:hover:bg-purple-950/30"
                            >
                              <service.icon className="h-6 w-6 text-purple-500 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-sm">{service.label}</h4>
                                <p className="text-xs text-zinc-500 mt-0.5">Learn more →</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Mobile Top Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-40 lg:hidden"
      >
        <nav className="mx-4 mt-3">
          <div className="rounded-2xl border border-white/10 bg-white/60 shadow-lg backdrop-blur-xl dark:border-white/5 dark:bg-black/60">
            <div className="flex h-14 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NexTrade
                </span>
              </Link>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 relative">
                  <Bell className="h-4 w-4" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </Button>
                <ThemeToggle />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl h-9 w-9"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Slide-Out Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-white shadow-2xl dark:bg-zinc-900 lg:hidden"
            >
              {/* Menu Header */}
              <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-bold">Menu</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Quick Auth Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                  <Button className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600" size="sm">
                    <Rocket className="mr-2 h-4 w-4" />
                    Start Selling
                  </Button>
                </div>
              </div>

              {/* Menu Content */}
              <div className="p-4 space-y-6">
                {mobileMenuSections.map((section) => (
                  <div key={section.title}>
                    <button
                      onClick={() => setExpandedMobileSection(
                        expandedMobileSection === section.title ? null : section.title
                      )}
                      className="flex w-full items-center justify-between mb-2"
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        {section.title}
                      </h3>
                      <ChevronDown className={cn(
                        "h-4 w-4 text-zinc-400 transition-transform",
                        expandedMobileSection === section.title && "rotate-180"
                      )} />
                    </button>
                    
                    <AnimatePresence>
                      {expandedMobileSection === section.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-1 overflow-hidden"
                        >
                          {section.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              <item.icon className="h-4 w-4 text-zinc-500" />
                              <span className="flex-1">{item.label}</span>
                              {item.badge && (
                                <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-[10px]">
                                  {item.badge}
                                </Badge>
                              )}
                              <ChevronRight className="h-3 w-3 text-zinc-400" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Contact Section */}
                <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-950/30 dark:to-purple-950/30">
                  <h4 className="font-semibold text-sm mb-2">Need Help?</h4>
                  <div className="space-y-2">
                    <Link href="/contact" className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <Phone className="h-4 w-4" />
                      Contact Support
                    </Link>
                    <Link href="/locations" className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <MapPin className="h-4 w-4" />
                      Our Offices
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      >
        <div className="mx-4 mb-4">
          <div className="rounded-2xl border border-white/10 bg-white/80 shadow-2xl backdrop-blur-2xl dark:border-white/5 dark:bg-black/80">
            <div className="flex items-center justify-around px-2 py-2">
              {[
                { icon: Home, label: "Home", href: "/" },
                { icon: Search, label: "Search", action: () => setIsSearchOpen(true) },
                { 
                  icon: Store, 
                  label: "Sell", 
                  href: "/sell",
                  special: true 
                },
                { icon: Heart, label: "Saved", href: "/wishlist", badge: wishlistCount },
                { icon: UserCircle, label: "Account", href: "/account" },
              ].map((item, index) => (
                <div key={index} className="relative">
                  {item.special ? (
                    <button
                      onClick={() => item.action ? item.action() : null}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <div className="relative -mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-[10px] font-medium text-zinc-500 mt-1">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={item.action ? (e) => { e.preventDefault(); item.action(); } : undefined}
                      className="flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    >
                      <div className="relative">
                        <item.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                        {item.badge > 0 && (
                          <Badge className="absolute -right-2 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 p-0 text-[8px]">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-zinc-500">{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay for Mobile */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="mx-4 mt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl border border-white/10 bg-white p-4 shadow-2xl dark:bg-zinc-900">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search products, suppliers..."
                    className="w-full rounded-xl bg-zinc-100 py-3 pl-10 pr-4 text-sm outline-none dark:bg-zinc-800"
                    autoFocus
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Electronics", "Machinery", "Fashion", "Packaging", "Chemicals"].map((tag) => (
                    <button
                      key={tag}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}