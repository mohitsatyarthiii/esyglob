// components/footer.js
"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Globe, 
  Shield, 
  Truck, 
  Headphones,
  ArrowRight,
  Building2,
  Factory,
  BadgeCheck,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Star,
  Zap,
  TrendingUp,
  Package,
  CreditCard,
  FileText,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Send,
  Bell,
  Heart,
  Award,
  Users,
  Clock,
  DollarSign,
  BarChart3,
  Cpu,
  Bot,
  Languages
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

const footerData = {
  marketplace: {
    title: "Marketplace",
    icon: Building2,
    links: [
      { label: "All Categories", href: "/categories", icon: Package },
      { label: "Electronics", href: "/categories/electronics", icon: Cpu },
      { label: "Machinery", href: "/categories/machinery", icon: Factory },
      { label: "Fashion", href: "/categories/fashion", icon: Sparkles },
      { label: "Home & Garden", href: "/categories/home", icon: Building2 },
      { label: "Chemicals", href: "/categories/chemicals", icon: Zap },
    ]
  },
  services: {
    title: "Services",
    icon: Zap,
    links: [
      { label: "AI Sourcing", href: "/services/ai-sourcing", icon: Bot, badge: "New" },
      { label: "Trade Assurance", href: "/services/trade-assurance", icon: Shield },
      { label: "Logistics", href: "/services/logistics", icon: Truck },
      { label: "Finance", href: "/services/finance", icon: DollarSign },
      { label: "Translation", href: "/services/translation", icon: Languages },
      { label: "Market Insights", href: "/services/insights", icon: TrendingUp, badge: "Hot" },
    ]
  },
  company: {
    title: "Company",
    icon: Building2,
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers", badge: "We're Hiring!" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" },
      { label: "Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ]
  },
  support: {
    title: "Support",
    icon: Headphones,
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
      { label: "Community", href: "/community" },
      { label: "FAQ", href: "/faq" },
      { label: "24/7 Support", href: "/support" },
    ]
  },
  legal: {
    title: "Legal & Compliance",
    icon: Shield,
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" },
      { label: "Security", href: "/security" },
      { label: "Trust Center", href: "/trust" },
    ]
  }
}

const certifications = [
  { name: "ISO 27001", icon: Shield },
  { name: "SOC 2 Type II", icon: BadgeCheck },
  { name: "GDPR Compliant", icon: Globe },
  { name: "PCI DSS Level 1", icon: CreditCard },
]

const socialLinks = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaGithub, href: "#", label: "GitHub" },]

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative border-t border-zinc-200 bg-gradient-to-b from-zinc-50 to-white dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900">
      
      {/* Top Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter & CTA Section */}
        <div className="py-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Send className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold">Stay Updated</h3>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Get weekly insights on global trade trends, AI sourcing tips, and exclusive supplier deals.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 rounded-xl border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {subscribed ? (
                    <>
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              <p className="mt-2 text-xs text-zinc-500">
                <Shield className="inline h-3 w-3 mr-1" />
                No spam. Unsubscribe anytime. 50K+ subscribers.
              </p>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: "Suppliers", value: "245K+", icon: Factory, color: "text-blue-500" },
                { label: "Buyers", value: "10M+", icon: Users, color: "text-green-500" },
                { label: "Countries", value: "190+", icon: Globe, color: "text-purple-500" },
                { label: "Uptime", value: "99.99%", icon: Zap, color: "text-amber-500" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
                  <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1`} />
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Logo & About Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EsyGlob
                </span>
              </Link>
              
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                The world's most advanced AI-powered B2B marketplace. Connect with verified suppliers, secure payments, and intelligent logistics.
              </p>

              {/* Certifications */}
              <div className="space-y-2 mb-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-2 text-xs text-zinc-500">
                    <cert.icon className="h-3.5 w-3.5 text-green-500" />
                    {cert.name}
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-all dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.values(footerData).map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-4">
                  <section.icon className="h-4 w-4 text-blue-500" />
                  <h3 className="font-semibold text-sm">{section.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                      >
                        {link.icon && <link.icon className="h-3.5 w-3.5 text-zinc-400" />}
                        <span>{link.label}</span>
                        {link.badge && (
                          <Badge className={`text-[9px] py-0 px-1.5 ${
                            link.badge === "New" 
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                              : link.badge === "Hot"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          }`}>
                            {link.badge}
                          </Badge>
                        )}
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* App Download & Contact */}
        <div className="py-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="grid md:grid-cols-3 gap-6">
            {/* App Download */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
              <Smartphone className="h-8 w-8 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Get the EsyGlob App</h4>
                <p className="text-xs text-zinc-500 mb-2">Trade on the go with our mobile app</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg text-xs h-7">
                     iOS
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg text-xs h-7">
                     Android
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Mail className="h-4 w-4 text-blue-500" />
                <span>support@esyglob.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>Vrindavan, Uttar-Pradesh, India</span>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800">
              <Headphones className="h-8 w-8 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">24/7 Customer Support</h4>
                <p className="text-xs text-zinc-500">Dedicated support team in 15 languages</p>
                <Button size="sm" variant="link" className="text-blue-600 p-0 h-auto text-xs mt-1">
                  Chat Now <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>© 2026 EsyGlob. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">AI-Powered B2B Marketplace</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Globe className="h-3.5 w-3.5" />
                <select className="bg-transparent border-none text-xs focus:outline-none cursor-pointer">
                  <option>English</option>
                  <option>中文</option>
                  <option>Español</option>
                  <option>العربية</option>
                  <option>日本語</option>
                  <option>Deutsch</option>
                </select>
              </div>
              <ThemeToggle />
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {[
              "💳 Visa", "💳 Mastercard", "💳 Amex", "🏦 Wire Transfer", 
              "₿ Crypto", "📱 Apple Pay", "📱 Google Pay", "🔐 Escrow"
            ].map((method) => (
              <Badge key={method} variant="secondary" className="text-[10px] py-1">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}