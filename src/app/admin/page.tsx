"use client";

import { ArrowUpRight, TrendingUp, ShieldAlert, UserCheck } from "lucide-react";

export default function AdminOverviewPage() {
  // Static placeholder data points for structural mockup
  const metrics = [
    {
      title: "Active Platforms Enrolled",
      count: "1,240",
      change: "+12% this week",
      icon: UserCheck,
      color: "text-emerald-500",
    },
    {
      title: "Vetting Validations Pending",
      count: "14",
      change: "Requires attention",
      icon: ShieldAlert,
      color: "text-amber-500",
    },
    {
      title: "Escrow Volume Processed",
      count: "$14,860",
      change: "+8% growth velocity",
      icon: TrendingUp,
      color: "text-blue-500",
    },
  ];

  const verificationQueueMock = [
    {
      id: "v1",
      name: "Alex Mercer",
      track: "Systems Architecture",
      applied: "2 hours ago",
    },
    {
      id: "v2",
      name: "Dr. Lora Kross",
      track: "Advanced Data Analytics",
      applied: "5 hours ago",
    },
    {
      id: "v3",
      name: "Sani Mohibur",
      track: "Full Stack MERN Stack",
      applied: "1 day ago",
    },
  ];

  return (
    <div className="space-y-10 w-full animate-fade-in">
      {/* Editorial Page Identification Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Ecosystem Control Overview
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor operational telemetry metrics, background screening validation
          states, and systemic transactions.
        </p>
      </div>

      {/* Grid Display Macro Metrics Highlight Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {metrics.map((m, index) => {
          const Icon = m.icon;
          return (
            <div
              key={index}
              className="bg-card border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xs relative overflow-hidden group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    {m.title}
                  </span>
                  <span className="text-3xl font-black text-foreground block">
                    {m.count}
                  </span>
                  <span className="text-[11px] font-bold text-muted-foreground block">
                    {m.change}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 ${m.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Layout Content Grid Row Block: Queue Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Background Screen Action Priorities List (Col Span 2) */}
        <div className="lg:col-span-2 bg-card border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-foreground">
                Urgent Instructor Applications
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Credentials needing cryptographic certificate checking analysis.
              </p>
            </div>
            <button className="text-[11px] font-bold text-emerald-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline cursor-pointer">
              Launch Queue <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-black/5 dark:divide-white/5 border-t border-black/5 dark:border-white/5">
            {verificationQueueMock.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between py-3.5"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-foreground">
                    {profile.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium">
                    {profile.track}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground font-bold">
                    {profile.applied}
                  </span>
                  <button className="h-7 px-3 text-[10px] font-bold rounded-lg border border-black/10 dark:border-white/10 hover:bg-muted text-foreground cursor-pointer transition-colors">
                    Review File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Platform Configuration Health Status Vectors */}
        <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-sm font-black text-foreground">
              Ecosystem Integrations
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Verification status of API sub-nodes.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                node: "Stripe Micro-Escrow Engine",
                status: "Operational",
                color:
                  "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 dark:text-blue-400 dark:bg-blue-500/5 dark:border-blue-500/10",
              },
              {
                node: "Socket Real-time Router",
                status: "Operational",
                color:
                  "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 dark:text-blue-400 dark:bg-blue-500/5 dark:border-blue-500/10",
              },
              {
                node: "Metadata Search Index Vector",
                status: "Operational",
                color:
                  "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 dark:text-blue-400 dark:bg-blue-500/5 dark:border-blue-500/10",
              },
            ].map((system, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-black/5 dark:border-white/5"
              >
                <span className="text-xs font-bold text-muted-foreground">
                  {system.node}
                </span>
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${system.color}`}
                >
                  {system.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
