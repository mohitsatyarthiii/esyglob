// components/sections/hero.js
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  Shield,
  ArrowRight,
  Zap,
  Cpu,
  Package
} from "lucide-react"
import { AnimatedDashboard } from "@/components/animations/animated-dashboard"

const floatingCards = [
  { icon: Cpu, title: "AI Hardware", value: "$2.4B", change: "+12.5%" },
  { icon: Package, title: "Industrial", value: "$5.1B", change: "+8.3%" },
  { icon: Zap, title: "Electronics", value: "$3.8B", change: "+15.2%" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-12 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[100px]" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <Badge className="mb-6 w-fit bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm backdrop-blur-xl">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered B2B Marketplace
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-7xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Future
              </span>
              <br />
              of Global Trade
            </h1>

            <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
              AI-powered sourcing, verified suppliers, and seamless transactions. 
              Connect with millions of buyers and suppliers across 190+ countries.
            </p>

            {/* AI Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <Input
                  placeholder="AI Sourcing: Describe what you need..."
                  className="h-14 border-2 border-zinc-200 bg-white/50 pl-12 pr-32 text-lg backdrop-blur-xl transition-all hover:border-blue-400 focus:border-blue-500 dark:border-zinc-700 dark:bg-black/20 dark:hover:border-blue-500"
                />
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Source with AI
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 grid grid-cols-3 gap-4 sm:gap-6"
            >
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50M+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">190+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">99.9%</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Uptime</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <AnimatedDashboard />
            
            {/* Floating Cards */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-8 top-20"
            >
              <div className="rounded-xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-green-400 to-emerald-400">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Live Trade Volume</div>
                    <div className="text-2xl font-bold text-green-500">$12.4B</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}