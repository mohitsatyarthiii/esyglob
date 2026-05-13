// components/navbar.js
"use client"

import * as React from "react"
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
  Rocket
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const megaMenuItems = [
  {
    title: "Categories",
    icon: Package,
    items: [
      { name: "Electronics", href: "#", icon: Cpu },
      { name: "Machinery", href: "#", icon: Zap },
      { name: "Fashion", href: "#", icon: Sparkles },
      { name: "Industrial", href: "#", icon: TrendingUp },
    ]
  },
  {
    title: "Services",
    icon: Globe,
    items: [
      { name: "AI Sourcing", href: "#", icon: Sparkles },
      { name: "Trade Assurance", href: "#", icon: Shield },
      { name: "Logistics", href: "#", icon: Rocket },
      { name: "Finance", href: "#", icon: TrendingUp },
    ]
  }
]

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = React.useState(null)
  const [notificationCount] = React.useState(3)
  const [wishlistCount] = React.useState(5)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full"
    >
      <nav className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl dark:border-white/5 dark:bg-black/20">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="hidden text-xl font-bold tracking-tight sm:inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NexTrade
              </span>
            </Link>

            {/* Mega Menu - Desktop */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {megaMenuItems.map((menu) => (
                <div
                  key={menu.title}
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(menu.title)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button className="flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100">
                    <menu.icon className="h-4 w-4" />
                    <span>{menu.title}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  
                  <AnimatePresence>
                    {activeMegaMenu === menu.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-700/50 dark:bg-zinc-900"
                      >
                        {menu.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* AI Search Bar */}
            <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
              <motion.div 
                className={cn(
                  "relative w-full max-w-xl transition-all duration-300",
                  isSearchOpen ? "scale-105" : "scale-100"
                )}
              >
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  placeholder="AI-powered search... Try 'sustainable packaging suppliers'"
                  className="h-10 border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800/50 dark:placeholder:text-zinc-500"
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => setIsSearchOpen(false)}
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-zinc-200 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                  ⌘K
                </kbd>
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-1">
              {/* AI Search for Mobile */}
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Search className="h-4 w-4" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
                    {notificationCount}
                  </Badge>
                )}
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 p-0 text-xs">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Auth Buttons - Desktop */}
              <div className="hidden sm:flex sm:items-center sm:space-x-2">
                <Button variant="ghost" size="sm" className="text-sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-sm hover:from-blue-700 hover:to-purple-700"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Start Selling
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
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

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-zinc-200 dark:border-zinc-700/50 lg:hidden"
              >
                <div className="space-y-1 p-4">
                  {megaMenuItems.map((menu) => (
                    <div key={menu.title}>
                      <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-zinc-500">
                        <menu.icon className="h-4 w-4" />
                        <span>{menu.title}</span>
                      </div>
                      {menu.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                  
                  <div className="mt-4 space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-700/50">
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      size="sm"
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Start Selling
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  )
}