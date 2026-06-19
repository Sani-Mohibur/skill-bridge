"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Star,
  CreditCard,
  Menu,
  X,
  LogOut,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Unified Admin Sidebar Navigation Map
  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "User Directory", href: "/admin/users", icon: Users },
    { name: "Vetting Queue", href: "/admin/verifications", icon: ShieldCheck },
    { name: "Featured Tutors", href: "/admin/featured", icon: Star },
    { name: "Financial Escrow", href: "/admin/finances", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* 1. Desktop Sidebar Component Container */}
      <aside className="hidden md:flex flex-col w-64 bg-background border-r border-black/5 dark:border-white/5 fixed inset-y-0 left-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-black/5 dark:border-white/5">
          <span className="text-base font-black tracking-tight text-foreground">
            Skill
            <span className="text-emerald-500 dark:text-blue-400">Bridge</span>
            <span className="ml-1.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              Admin
            </span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 h-10 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <button className="flex items-center gap-3 w-full px-4 h-10 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
            Exit Panel
          </button>
        </div>
      </aside>

      {/* 2. Mobile Nav Header Top-Bar */}
      <div className="md:hidden flex items-center justify-between w-full h-16 px-4 bg-background border-b border-black/5 dark:border-white/5 fixed top-0 inset-x-0 z-30">
        <span className="text-sm font-black text-foreground">
          SkillBridge <span className="text-red-500">Admin</span>
        </span>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-muted text-foreground cursor-pointer"
        >
          {isMobileOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 3. Mobile Navigation Draw Overlay Menu */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-background/90 backdrop-blur-md pt-20 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 h-12 rounded-xl text-xs font-bold ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* 4. Scrollable Main Layout Display Viewport */}
      <div className="flex-1 md:pl-64 pt-16 md:pt-0 flex flex-col min-w-0">
        <main className="flex-grow p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
