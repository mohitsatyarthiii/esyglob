// app/page.js - FIXED (Remove scroll-based opacity)
"use client"

import { AIFeatures } from "@/components/sections/ai-features"
import { CTA } from "@/components/sections/cta"
import { Hero } from "@/components/sections/hero"
import { ProductsMarketplace } from "@/components/sections/products-marketplace"
import { TrustedBy } from "@/components/sections/trusted-by"
import { VerifiedSuppliers } from "@/components/sections/verified-suppliers"


export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsMarketplace/>
      <AIFeatures/>
      <VerifiedSuppliers/>
      <TrustedBy />
      <CTA/>
      
      {/* Other sections will be added later */}
    </>
  )
}