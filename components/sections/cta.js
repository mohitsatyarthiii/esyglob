// components/sections/cta.js
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Rocket, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Shield, 
  Zap, 
  Star,
  CheckCircle2,
  Play,
  Trophy,
  Users,
  Factory,
  Package,
  TrendingUp,
  Clock,
  DollarSign,
  BadgeCheck,
  Headphones,
  MessageSquare,
  Send,
  ChevronRight,
  Bot,
  Brain,
  Target,
  Award,
  Building2,
  CreditCard,
  Lock,
  FileCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const statsTicker = [
  { label: "Suppliers Online", value: "56,782", icon: Factory },
  { label: "Active RFQs", value: "34,521", icon: FileCheck },
  { label: "Deals Closed Today", value: "$847M", icon: DollarSign },
  { label: "Shipments in Transit", value: "123,456", icon: TrendingUp },
  { label: "New Buyers Today", value: "4,892", icon: Users },
  { label: "Avg. Response Time", value: "2.4h", icon: Clock },
]

const successStories = [
  { name: "John Martinez", company: "GlobalTech Inc.", savings: "$2.4M", time: "6 months", flag: "🇺🇸", role: "CEO" },
  { name: "Sarah Chen", company: "EuroSupply GmbH", savings: "€1.8M", time: "4 months", flag: "🇩🇪", role: "Procurement Director" },
  { name: "Raj Patel", company: "Mumbai Exports Ltd", savings: "₹12Cr", time: "8 months", flag: "🇮🇳", role: "Managing Director" },
  { name: "Yuki Tanaka", company: "Tokyo Trading Co.", savings: "¥280M", time: "3 months", flag: "🇯🇵", role: "Supply Chain Manager" },
]

const trustBadges = [
  { icon: Shield, label: "Trade Assurance", desc: "$100M+ Protected" },
  { icon: BadgeCheck, label: "Verified Suppliers", desc: "245K+ Factory Audited" },
  { icon: Headphones, label: "Enterprise Support", desc: "Dedicated Account Manager" },
  { icon: Bot, label: "AI-Powered Matching", desc: "98.5% Accuracy Rate" },
]

const guarantees = [
  "No Credit Card Required",
  "Free Supplier Matching",
  "Cancel Anytime",
  "GDPR Compliant",
  "ISO 27001 Certified",
  "SOC 2 Type II"
]

export function CTA() {
  const [email, setEmail] = useState("")
  const [productNeed, setProductNeed] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeStory, setActiveStory] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % successStories.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && productNeed) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
        setProductNeed("")
      }, 4000)
    }
  }

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-white dark:bg-zinc-900">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2">
            <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              10M+ businesses already trading on NexTrade
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Ready to
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Source Globally</span>
            ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Let AI match you with verified suppliers, secure your payments, 
            and optimize your supply chain. Start sourcing in minutes.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button 
            size="lg" 
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base px-8 py-6 h-auto shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Start Sourcing Now — It's Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-xl border-2 border-zinc-300 dark:border-zinc-600 text-base px-8 py-6 h-auto hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo (2 min)
          </Button>
        </motion.div>

        {/* Stats Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-12 overflow-hidden border-y border-zinc-200 dark:border-zinc-800 py-4"
        >
          <div className="flex gap-6 animate-scroll">
            {[...statsTicker, ...statsTicker].map((stat, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3"
              >
                <stat.icon className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-base font-bold text-zinc-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          
          {/* Left - Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Get Matched with Suppliers</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">AI analyzes your requirements and finds the best matches</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    What are you looking to source?
                  </label>
                  <Input
                    placeholder='e.g., "Industrial CNC machines from Germany"'
                    className="rounded-xl border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-900 h-12 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                    value={productNeed}
                    onChange={(e) => setProductNeed(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Your business email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    className="rounded-xl border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-900 h-12 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 text-base"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <BadgeCheck className="mr-2 h-5 w-5" />
                      Request Sent Successfully
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Get Matched with Suppliers
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Lock className="h-3.5 w-3.5 text-green-500" />
                <span>Your information is secure and encrypted. We never share your data.</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Trust & Success (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Success Story Card */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-white">Client Success</h3>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl mb-2">{successStories[activeStory].flag}</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {successStories[activeStory].savings}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    saved in {successStories[activeStory].time}
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {successStories[activeStory].name}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {successStories[activeStory].role}
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {successStories[activeStory].company}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-1.5 mt-4">
                {successStories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStory(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeStory 
                        ? 'w-6 bg-blue-500' 
                        : 'w-1.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                    }`}
                    aria-label={`Story ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 p-4 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                >
                  <badge.icon className="h-5 w-5 text-blue-500 mb-2" />
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">{badge.label}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{badge.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Guarantee Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30 px-6 py-3">
            {guarantees.map((text) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  )
}