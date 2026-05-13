// components/sections/ai-features.js
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Globe, 
  Shield, 
  MessageSquare, 
  TrendingUp, 
  Search,
  Bot,
  Languages,
  FileSearch,
  BarChart3,
  Target,
  Cpu,
  ArrowRight,
  Play,
  Pause,
  CheckCircle2,
  Star,
  Clock,
  DollarSign,
  Users,
  Lightbulb,
  Rocket,
  Wand2,
  Network,
  LineChart,
  Scan,
  BadgeCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// AI Features data
const aiFeatures = [
  {
    id: "supplier-match",
    icon: Brain,
    title: "AI Supplier Matchmaking",
    subtitle: "Smart vendor discovery",
    description: "Our AI analyzes 50M+ supplier profiles, past transactions, and quality metrics to match you with the perfect manufacturers in seconds.",
    stats: [
      { label: "Match Accuracy", value: "98.5%", icon: Target },
      { label: "Time Saved", value: "85%", icon: Clock },
      { label: "Success Rate", value: "94%", icon: TrendingUp }
    ],
    features: [
      "Real-time supplier scoring",
      "Past performance analysis",
      "Compatibility prediction",
      "Risk assessment"
    ],
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-950/50",
    iconColor: "text-blue-500",
    buttonGradient: "from-blue-600 to-cyan-600",
    demoImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    liveStatus: "2,847 matches today"
  },
  {
    id: "rfq-generator",
    icon: FileSearch,
    title: "AI RFQ Generator",
    subtitle: "Auto-create perfect RFQs",
    description: "Describe what you need in plain language and our AI generates detailed, professional RFQs with specifications, quantities, and compliance requirements.",
    stats: [
      { label: "RFQs Generated", value: "1.2M+", icon: FileSearch },
      { label: "Response Rate", value: "92%", icon: MessageSquare },
      { label: "Time to Create", value: "< 2 min", icon: Clock }
    ],
    features: [
      "Natural language input",
      "Auto-specification matching",
      "Multi-language support",
      "Template customization"
    ],
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-200 dark:border-purple-800",
    iconBg: "bg-purple-100 dark:bg-purple-950/50",
    iconColor: "text-purple-500",
    buttonGradient: "from-purple-600 to-pink-600",
    demoImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    liveStatus: "5,234 RFQs posted today"
  },
  {
    id: "translation",
    icon: Languages,
    title: "AI Translation Engine",
    subtitle: "Real-time multilingual trade",
    description: "Break language barriers instantly. Our AI translates negotiations, documents, and specifications across 100+ languages with industry-specific terminology.",
    stats: [
      { label: "Languages", value: "100+", icon: Globe },
      { label: "Accuracy", value: "99.2%", icon: Target },
      { label: "Documents/Day", value: "500K+", icon: FileSearch }
    ],
    features: [
      "Real-time chat translation",
      "Document translation",
      "Industry terminology",
      "Cultural context awareness"
    ],
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/50",
    iconColor: "text-emerald-500",
    buttonGradient: "from-emerald-600 to-green-600",
    demoImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    liveStatus: "50K translations today"
  },
  {
    id: "fraud-detection",
    icon: Shield,
    title: "AI Fraud Detection",
    subtitle: "Enterprise-grade security",
    description: "Advanced machine learning algorithms analyze transaction patterns, supplier behavior, and documentation to detect and prevent fraud before it happens.",
    stats: [
      { label: "Fraud Prevented", value: "$2.4B+", icon: Shield },
      { label: "Detection Rate", value: "99.7%", icon: Target },
      { label: "Response Time", value: "< 0.1s", icon: Zap }
    ],
    features: [
      "Real-time monitoring",
      "Pattern recognition",
      "Document verification",
      "Risk scoring"
    ],
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-500/10 to-orange-500/10",
    borderColor: "border-red-200 dark:border-red-800",
    iconBg: "bg-red-100 dark:bg-red-950/50",
    iconColor: "text-red-500",
    buttonGradient: "from-red-600 to-orange-600",
    demoImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    liveStatus: "12,847 threats blocked today"
  },
  {
    id: "negotiation",
    icon: MessageSquare,
    title: "AI Negotiation Assistant",
    subtitle: "Smart deal optimization",
    description: "Get real-time suggestions during supplier negotiations. AI analyzes market prices, historical deals, and supplier patterns to help you get the best terms.",
    stats: [
      { label: "Avg. Savings", value: "23%", icon: DollarSign },
      { label: "Deals Optimized", value: "890K+", icon: TrendingUp },
      { label: "Success Rate", value: "96%", icon: Target }
    ],
    features: [
      "Price optimization",
      "Terms suggestion",
      "Market comparison",
      "Bulk discount analysis"
    ],
    gradient: "from-amber-500 to-yellow-500",
    bgGradient: "from-amber-500/10 to-yellow-500/10",
    borderColor: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-950/50",
    iconColor: "text-amber-500",
    buttonGradient: "from-amber-600 to-yellow-600",
    demoImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    liveStatus: "3,421 negotiations active"
  },
  {
    id: "market-insights",
    icon: TrendingUp,
    title: "AI Market Insights",
    subtitle: "Predictive analytics",
    description: "Stay ahead of market trends with AI-powered demand forecasting, price prediction, and competitive analysis across 190+ countries and 500+ industries.",
    stats: [
      { label: "Data Points", value: "10B+", icon: BarChart3 },
      { label: "Industries", value: "500+", icon: Network },
      { label: "Accuracy", value: "95.8%", icon: Target }
    ],
    features: [
      "Demand forecasting",
      "Price trend analysis",
      "Competitor tracking",
      "Market opportunity alerts"
    ],
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-500/10 to-purple-500/10",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    iconBg: "bg-indigo-100 dark:bg-indigo-950/50",
    iconColor: "text-indigo-500",
    buttonGradient: "from-indigo-600 to-purple-600",
    demoImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    liveStatus: "2.1M insights generated today"
  }
]

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      let startTime = null
      let animationFrame

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        const numValue = parseFloat(value.replace(/[^0-9.]/g, ''))
        setCount(numValue * easeOut)
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  const formatValue = () => {
    if (value.includes('B')) return `${count.toFixed(1)}B`
    if (value.includes('M')) return `${count.toFixed(1)}M`
    if (value.includes('K')) return `${count.toFixed(0)}K`
    if (value.includes('%')) return `${count.toFixed(1)}%`
    if (value.includes('<')) return `< ${Math.floor(count)}`
    return Math.floor(count).toLocaleString()
  }

  return <span ref={ref}>{formatValue()}{suffix}</span>
}

// AI Feature Card Component
const AIFeatureCard = ({ feature, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 ${
        isActive 
          ? `${feature.borderColor} bg-white dark:bg-zinc-800/80 shadow-xl scale-[1.02]` 
          : 'border-transparent bg-white/50 dark:bg-zinc-800/30 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-lg'
      }`}
    >
      {/* Icon */}
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg} mb-4 group-hover:scale-110 transition-transform`}>
        <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
      <p className="text-sm text-zinc-500 mb-3">{feature.subtitle}</p>

      {/* Live Status */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs text-green-500 font-medium">{feature.liveStatus}</span>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {feature.stats.slice(0, 3).map((stat, i) => (
          <div key={i} className="text-center">
            <div className={`text-sm font-bold ${feature.iconColor}`}>
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="text-[10px] text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Learn More */}
      <Button 
        variant="ghost" 
        size="sm" 
        className={`w-full rounded-xl ${isActive ? `bg-gradient-to-r ${feature.buttonGradient} text-white` : ''}`}
      >
        {isActive ? 'Active' : 'Learn More'}
        <ArrowRight className={`ml-2 h-3 w-3 transition-transform ${isActive ? '' : 'group-hover:translate-x-1'}`} />
      </Button>
    </motion.div>
  )
}

export function AIFeatures() {
  const [activeFeature, setActiveFeature] = useState(aiFeatures[0].id)
  const currentFeature = aiFeatures.find(f => f.id === activeFeature)

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm backdrop-blur-xl">
            <Sparkles className="mr-2 h-4 w-4" />
            Powered by Advanced AI
          </Badge>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <span className="text-zinc-900 dark:text-zinc-100"> Trade Intelligence</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Six powerful AI engines working together to transform how you source, negotiate, and trade globally.
          </p>

          {/* Live AI Stats Bar */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { label: "AI Decisions/Day", value: "50M+", icon: Brain },
              { label: "Data Processed", value: "10TB+", icon: Cpu },
              { label: "Active AI Models", value: "127", icon: Network },
              { label: "Uptime", value: "99.99%", icon: CheckCircle2 },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-4 py-2 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-800/50">
                <stat.icon className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-bold">{stat.value}</span>
                <span className="text-xs text-zinc-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main AI Feature Display */}
        <div className="grid gap-6 lg:grid-cols-3 mb-12">
          {/* Left - Feature Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {aiFeatures.slice(0, 6).map((feature, index) => (
              <AIFeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                isActive={activeFeature === feature.id}
                onClick={() => setActiveFeature(feature.id)}
              />
            ))}
          </div>

          {/* Right - Active Feature Detail */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border-2 ${currentFeature.borderColor} bg-white dark:bg-zinc-900 p-6 h-full sticky top-24`}
              >
                {/* Feature Image */}
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img
                    src={currentFeature.demoImage}
                    alt={currentFeature.title}
                    className="h-full w-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${currentFeature.bgGradient} to-transparent`} />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-zinc-900 backdrop-blur-sm">
                      <Bot className="mr-1 h-3 w-3" />
                      AI Active
                    </Badge>
                  </div>
                </div>

                {/* Feature Details */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${currentFeature.iconBg}`}>
                    <currentFeature.icon className={`h-6 w-6 ${currentFeature.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{currentFeature.title}</h3>
                    <p className="text-sm text-zinc-500">{currentFeature.subtitle}</p>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed">
                  {currentFeature.description}
                </p>

                {/* Feature List */}
                <div className="space-y-2 mb-6">
                  {currentFeature.features.map((feat, i) => (
                    <motion.div
                      key={feat}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className={`h-4 w-4 ${currentFeature.iconColor} flex-shrink-0`} />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{feat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Live Activity */}
                <div className={`rounded-xl ${currentFeature.bgGradient} p-4 mb-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold">Live Activity</span>
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <div className={`h-1.5 w-1.5 rounded-full ${currentFeature.iconColor.replace('text', 'bg')}`} />
                        <span>Processing request from {['Germany', 'Japan', 'Brazil'][i]}...</span>
                        <span className="text-zinc-400 ml-auto">{['2s', '5s', '8s'][i]} ago</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button className={`w-full rounded-xl bg-gradient-to-r ${currentFeature.buttonGradient} text-white`}>
                  <Rocket className="mr-2 h-4 w-4" />
                  Try {currentFeature.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/50 p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Brain, label: "AI Models", value: "127 Active", color: "text-blue-500" },
              { icon: Shield, label: "Security", value: "SOC 2 Type II", color: "text-green-500" },
              { icon: Zap, label: "Response Time", value: "< 100ms", color: "text-amber-500" },
              { icon: Globe, label: "Coverage", value: "190+ Countries", color: "text-purple-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon className={`h-5 w-5 ${item.color}`} />
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