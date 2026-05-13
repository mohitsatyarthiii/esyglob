// components/navbar.js - CLEAN, SPACIOUS, PERFECTLY ALIGNED
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
  Shield,
  Cpu,
  Package,
  ArrowRight,
  User,
  LogIn,
  Rocket,
  Factory,
  Verified,
  BadgeCheck,
  Truck,
  Headphones,
  Smartphone,
  Tag,
  Briefcase,
  CreditCard,
  DollarSign,
  MessageSquare,
  BarChart3,
  Star,
  Crown,
  HelpCircle,
  ShoppingCart,
  LayoutGrid,
  Store,
  UserCircle,
  ChevronRight,
  Home,
  ShoppingBag,
  BookOpen,
  FileQuestion,
  Users,
  MapPin,
  Phone,
  Trophy,
  Car,
  Beaker,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

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
    ]
  }
}

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
      { icon: MessageSquare, label: "AI Assistant", href: "/ai-assistant" },
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setActiveMegaMenu(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const handleMegaMenuEnter = (menu) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setActiveMegaMenu(menu)
  }

  const handleMegaMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 200)
  }

  return (
    <>
      {/* ============ DESKTOP NAVBAR ============ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 hidden lg:block"
      >
        <nav className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "relative mt-4 transition-all duration-300 rounded-2xl border",
            scrolled 
              ? "bg-white/80 border-zinc-200/50 shadow-2xl backdrop-blur-2xl dark:bg-zinc-900/80 dark:border-zinc-700/50"
              : "bg-white/60 border-zinc-200/30 shadow-lg backdrop-blur-xl dark:bg-zinc-900/60 dark:border-zinc-700/30"
          )}>
            
            {/* Main Row */}
            <div className="flex items-center justify-between h-16 px-5 gap-4">
              
              {/* LEFT: Logo */}
              <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                  EsyGlob
                </span>
              </Link>

              {/* CENTER: Navigation Links */}
              <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
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
                        "flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200",
                        activeMegaMenu === item.menu
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
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

                <Link
                  href="/tax-exemption"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white transition-all"
                >
                  <Tag className="h-4 w-4" />
                  Tax Exemption
                </Link>

                
              </div>

              {/* RIGHT: Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Search Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="h-4.5 w-4.5" />
                </Button>

                {/* Notifications */}
                <Link href="/notifications" className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all">
                  <Bell className="h-4.5 w-4.5 text-zinc-600 dark:text-zinc-400" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </Link>

                {/* Wishlist */}
                <Link href="/wishlist" className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all">
                  <Heart className="h-4.5 w-4.5 text-zinc-600 dark:text-zinc-400" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </Link>

                {/* Cart */}
                <Link href="/orders" className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all">
                  <ShoppingCart className="h-4.5 w-4.5 text-zinc-600 dark:text-zinc-400" />
                </Link>

                {/* Divider */}
                <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700 mx-1" />

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Auth Buttons */}
                <Button variant="ghost" size="sm" className="rounded-lg text-[13px] font-medium">
                  <LogIn className="mr-1.5 h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-[13px] font-medium hover:from-blue-700 hover:to-purple-700 shadow-md"
                >
                  <Rocket className="mr-1.5 h-4 w-4" />
                  Start Selling
                </Button>
              </div>
            </div>

            {/* Search Overlay */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-zinc-200 dark:border-zinc-700/50 px-5 py-3"
                >
                  <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search products, suppliers, categories..."
                      className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 py-2.5 pl-10 pr-20 text-sm outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-zinc-700 px-1.5 py-0.5 text-[11px] text-zinc-400 border border-zinc-200 dark:border-zinc-600">
                      ⌘K
                    </kbd>
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
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute left-4 right-4 top-full mt-2"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
                }}
                onMouseLeave={handleMegaMenuLeave}
              >
                <div className="mx-auto max-w-[1400px]">
                  <div className="rounded-2xl border border-zinc-200 bg-white shadow-2xl p-6 dark:border-zinc-700 dark:bg-zinc-900">
                    
                    {/* Categories */}
                    {activeMegaMenu === "categories" && (
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Featured Categories</h3>
                          <div className="grid grid-cols-3 gap-3">
                            {megaMenuData.categories.featured.map((cat) => (
                              <Link key={cat.label} href={cat.href} className="group rounded-xl border border-zinc-100 p-3.5 hover:border-blue-200 hover:bg-blue-50/50 dark:border-zinc-700 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 transition-all">
                                <cat.icon className="h-6 w-6 text-blue-500 mb-2" />
                                <h4 className="font-semibold text-sm mb-1.5 group-hover:text-blue-600">{cat.label}</h4>
                                <div className="space-y-0.5">
                                  {cat.items.map((item) => (
                                    <div key={item} className="text-xs text-zinc-500">{item}</div>
                                  ))}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Quick Links</h3>
                          <div className="space-y-1">
                            {megaMenuData.categories.quickLinks.map((link) => (
                              <Link key={link.label} href={link.href} className="flex items-center gap-2.5 rounded-lg p-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                                <link.icon className="h-4 w-4 text-zinc-400" />
                                <span>{link.label}</span>
                                <ArrowRight className="ml-auto h-3 w-3 text-zinc-400" />
                              </Link>
                            ))}
                          </div>
                          <Link href="/categories" className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 text-sm font-medium text-white hover:opacity-90 transition-all">
                            View All Categories <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Verified */}
                    {activeMegaMenu === "verified" && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <BadgeCheck className="h-5 w-5 text-green-500" />
                          <h3 className="text-lg font-semibold">Verified Manufacturers</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {megaMenuData.verified.stats.map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-zinc-100 p-3 text-center dark:border-zinc-700">
                              <stat.icon className="mx-auto h-6 w-6 text-green-500 mb-1.5" />
                              <div className="text-xl font-bold">{stat.value}</div>
                              <div className="text-xs text-zinc-500">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {megaMenuData.verified.features.map((feature) => (
                            <Link key={feature.label} href="#" className="flex items-start gap-3 rounded-xl border border-zinc-100 p-3.5 hover:border-green-200 dark:border-zinc-700 dark:hover:border-green-800 transition-all">
                              <feature.icon className="h-5 w-5 text-green-500 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-sm">{feature.label}</h4>
                                <p className="text-xs text-zinc-500 mt-0.5">{feature.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Protection */}
                    {activeMegaMenu === "protection" && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Shield className="h-5 w-5 text-blue-500" />
                          <h3 className="text-lg font-semibold">Order Protections</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {megaMenuData.protection.guarantees.map((g) => (
                            <Link key={g.label} href="#" className="rounded-xl border border-zinc-100 p-5 text-center hover:border-blue-200 hover:bg-blue-50/50 dark:border-zinc-700 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 transition-all">
                              <g.icon className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                              <h4 className="font-semibold text-sm mb-1">{g.label}</h4>
                              <p className="text-xs text-zinc-500">{g.desc}</p>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-3.5 dark:from-blue-950/30 dark:to-purple-950/30 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Crown className="h-5 w-5 text-amber-500" />
                            <div>
                              <span className="font-semibold text-sm">Trade Assurance</span>
                              <p className="text-xs text-zinc-500">Payment protection on every order</p>
                            </div>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">Learn More <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    )}

                    {/* Services */}
                    {activeMegaMenu === "services" && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Briefcase className="h-5 w-5 text-purple-500" />
                          <h3 className="text-lg font-semibold">Our Services</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {megaMenuData.services.items.map((service) => (
                            <Link key={service.label} href={service.href} className="flex items-start gap-3 rounded-xl border border-zinc-100 p-3.5 hover:border-purple-200 dark:border-zinc-700 dark:hover:border-purple-800 transition-all">
                              <service.icon className="h-5 w-5 text-purple-500 mt-0.5" />
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

      {/* ============ MOBILE TOP BAR ============ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-40 lg:hidden"
      >
        <nav className="mx-4 mt-3">
          <div className="rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/80">
            <div className="flex h-14 items-center justify-between px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">EsyGlob</span>
              </Link>
              <div className="flex items-center gap-0.5">
                <Link href="/notifications" className="relative p-2 rounded-lg">
                  <Bell className="h-4.5 w-4.5 text-zinc-600 dark:text-zinc-400" />
                  {notificationCount > 0 && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />}
                </Link>
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ============ MOBILE SLIDE-OUT MENU ============ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-white dark:bg-zinc-900 shadow-2xl lg:hidden"
            >
              <div className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold">Menu</span>
                  <Button variant="ghost" size="icon" className="rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-lg" size="sm"><LogIn className="mr-1.5 h-4 w-4" />Sign In</Button>
                  <Button className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600" size="sm"><Rocket className="mr-1.5 h-4 w-4" />Start Selling</Button>
                </div>
              </div>
              <div className="p-4 space-y-5">
                {mobileMenuSections.map((section) => (
                  <div key={section.title}>
                    <button
                      onClick={() => setExpandedMobileSection(expandedMobileSection === section.title ? null : section.title)}
                      className="flex w-full items-center justify-between mb-1.5"
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{section.title}</h3>
                      <ChevronDown className={cn("h-4 w-4 text-zinc-400 transition-transform", expandedMobileSection === section.title && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {expandedMobileSection === section.title && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-0.5 overflow-hidden">
                          {section.items.map((item) => (
                            <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                              <item.icon className="h-4 w-4 text-zinc-400" />
                              <span className="flex-1">{item.label}</span>
                              {item.badge && <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 text-[10px]">{item.badge}</Badge>}
                              <ChevronRight className="h-3 w-3 text-zinc-400" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4">
                  <h4 className="font-semibold text-sm mb-2">Need Help?</h4>
                  <div className="space-y-1.5">
                    <Link href="/contact" className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"><Phone className="h-4 w-4" />Contact Support</Link>
                    <Link href="/locations" className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"><MapPin className="h-4 w-4" />Our Offices</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============ MOBILE BOTTOM NAV ============ */}
      <motion.nav
        initial={{ y: 100 }} animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      >
        <div className="mx-3 mb-3">
          <div className="rounded-2xl border border-zinc-200/50 bg-white/90 shadow-2xl backdrop-blur-2xl dark:border-zinc-700/50 dark:bg-zinc-900/90">
            <div className="flex items-center justify-around px-1 py-2">
              {[
                { icon: Home, label: "Home", href: "/" },
                { icon: Search, label: "Search", action: () => setIsSearchOpen(true) },
                { icon: Store, label: "Sell", href: "/sell", special: true },
                { icon: Heart, label: "Saved", href: "/wishlist", badge: wishlistCount },
                { icon: UserCircle, label: "Account", href: "/account" },
              ].map((item, i) => (
                <div key={i}>
                  {item.special ? (
                    <button onClick={() => item.action?.()} className="flex flex-col items-center gap-0.5">
                      <div className="relative -mt-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25 active:scale-95 transition-transform">
                        <item.icon className="h-5.5 w-5.5 text-white" />
                      </div>
                      <span className="text-[10px] font-medium text-zinc-500 mt-0.5">{item.label}</span>
                    </button>
                  ) : (
                    <Link href={item.href || "#"} onClick={item.action ? (e) => { e.preventDefault(); item.action() } : undefined} className="flex flex-col items-center gap-0.5 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all">
                      <div className="relative">
                        <item.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                        {item.badge > 0 && <span className="absolute -right-1.5 -top-1 h-3.5 w-3.5 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">{item.badge}</span>}
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

      {/* ============ MOBILE SEARCH OVERLAY ============ */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div initial={{ y: -80 }} animate={{ y: 0 }} exit={{ y: -80 }} className="mx-4 mt-16" onClick={(e) => e.stopPropagation()}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <input type="text" placeholder="Search products, suppliers..." className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 py-3 pl-10 pr-4 text-sm outline-none" autoFocus />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Electronics", "Machinery", "Fashion", "Packaging"].map((tag) => (
                    <button key={tag} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">{tag}</button>
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