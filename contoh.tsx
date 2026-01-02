"use client"

import { cn } from "@/lib/utils"

import { BottomNav } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, ChevronRight, Package, TrendingUp, Star } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-primary text-white p-6 pb-12 rounded-b-[2.5rem] shadow-xl relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 overflow-hidden">
              <Image src="/shop-avatar.jpg" alt="Shop" width={40} height={40} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-80">Welcome back,</p>
              <h2 className="font-bold">Mitra Motor Sejahtera</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <input
            type="text"
            placeholder="Search parts by number or name..."
            className="w-full h-12 bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 -mt-6 pb-20 space-y-6">
        {/* Campaign Banner - Inspired by Image 1 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Current Campaign</h3>
            <button className="text-primary text-xs font-semibold flex items-center">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <Card className="relative overflow-hidden bg-white border-none shadow-sm h-40 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
            <Image
              src="/honda-engine-campaign.jpg"
              alt="Campaign"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
              <Badge className="w-fit mb-2 bg-primary hover:bg-primary border-none text-[10px]">NEW CONTRACT</Badge>
              <h4 className="text-white font-bold text-lg leading-tight mb-1">Gear Up & Get Rewarded</h4>
              <p className="text-white/70 text-xs">Ends Dec 31, 2025 • Target: 85% Reach</p>
            </div>
          </Card>
        </section>

        {/* Achievement Status - Inspired by Image 1 */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-none shadow-sm flex flex-col items-center text-center">
            <div className="relative w-16 h-16 mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-neutral-100"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeDasharray="50, 100"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-bold text-sm">50%</span>
            </div>
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Contract Reach</p>
          </Card>
          <Card className="p-4 border-none shadow-sm flex flex-col items-center justify-center text-center">
            <TrendingUp className="text-primary mb-2" size={24} />
            <h4 className="font-bold text-lg">Rp 12.5M</h4>
            <p className="text-[10px] font-bold uppercase text-muted-foreground">Monthly Buy-in</p>
          </Card>
        </section>

        {/* Quick Menus - Inspired by Image 5 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Quick Menu</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Package, label: "HGP", color: "bg-red-50 text-red-600" },
              { icon: Star, label: "Oil", color: "bg-blue-50 text-blue-600" },
              { icon: TrendingUp, label: "Promo", color: "bg-orange-50 text-orange-600" },
              { icon: Package, label: "Stock", color: "bg-green-50 text-green-600" },
            ].map((menu, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm", menu.color)}>
                  <menu.icon size={20} />
                </div>
                <span className="text-[10px] font-medium">{menu.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Orders - Inspired by Image 2 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Active Orders</h3>
            <button className="text-primary text-xs font-semibold">Track All</button>
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Card key={i} className="p-4 border-none shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center">
                    <Package className="text-muted-foreground" size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">PO/ABC/231025/00{i}</h5>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Status: <span className="text-orange-500 font-bold">On Process</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">Rp 10.5M</p>
                  <p className="text-[10px] text-muted-foreground">25 Oct 2025</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  )
}
