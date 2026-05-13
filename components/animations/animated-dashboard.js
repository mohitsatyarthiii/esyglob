// components/animations/animated-dashboard.js
"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Users, 
  Package, 
  Globe,
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react"

export function AnimatedDashboard() {
  const chartData = [65, 45, 75, 55, 80, 60, 90]
  
  return (
    <div className="relative">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
        {/* Dashboard Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Global Trade Analytics</h3>
            <p className="text-sm text-zinc-500">Real-time market insights</p>
          </div>
          <div className="flex space-x-2">
            <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">Live</div>
            <Globe className="h-5 w-5 text-blue-400" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          {[
            { label: "Active Orders", value: "12,847", change: "+12.5%", up: true },
            { label: "Total Volume", value: "$847M", change: "+8.2%", up: true },
            { label: "Suppliers", value: "45.2K", change: "-2.1%", up: false },
            { label: "Avg. Response", value: "2.4h", change: "+15.3%", up: true },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="rounded-xl border border-white/5 bg-white/5 p-4"
            >
              <div className="text-xs text-zinc-500">{stat.label}</div>
              <div className="mt-1 text-xl font-bold">{stat.value}</div>
              <div className={`mt-1 flex items-center text-xs ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Chart */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Trade Volume (7 days)</div>
          <div className="flex h-32 items-end space-x-2">
            {chartData.map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-500 to-purple-500"
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 space-y-3">
          {[
            { icon: Package, text: "New order from Germany", time: "2 min ago", color: "text-blue-400" },
            { icon: Users, text: "Supplier verified in China", time: "5 min ago", color: "text-green-400" },
            { icon: TrendingUp, text: "Market trend alert: Electronics", time: "8 min ago", color: "text-purple-400" },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3"
            >
              <div className="flex items-center space-x-3">
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
                <span className="text-sm">{activity.text}</span>
              </div>
              <span className="text-xs text-zinc-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}