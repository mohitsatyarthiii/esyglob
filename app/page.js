// app/page.js
"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Hero } from "@/components/sections/hero"
import { TrustedBy } from "@/components/sections/trusted-by"
import { AIFeatures } from "@/components/sections/ai-features"
import { Categories } from "@/components/sections/categories"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { VerifiedSuppliers } from "@/components/sections/verified-suppliers"
import { HowItWorks } from "@/components/sections/how-it-works"
import { LiveActivity } from "@/components/sections/live-activity"
import { LogisticsProtection } from "@/components/sections/logistics-protection"
import { Testimonials } from "@/components/sections/testimonials"
import { WorldMap } from "@/components/sections/world-map"
import { CTA } from "@/components/sections/cta"
import { LoadingSkeleton } from "@/components/loading-skeleton"

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.95, 1])

  return (
    <motion.div style={{ opacity, scale }}>
      <Hero />
      <TrustedBy />
      <AIFeatures />
      <Categories />
      <FeaturedProducts />
      <VerifiedSuppliers />
      <HowItWorks />
      <LiveActivity />
      <LogisticsProtection />
      <Testimonials />
      <WorldMap />
      <CTA />
    </motion.div>
  )
}