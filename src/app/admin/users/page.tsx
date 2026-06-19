"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Ban,
  CheckCircle,
  ShieldAlert,
  MoreVertical,
} from "lucide-react";

export default function AdminUserDirectoryPage() {
  const [activeTab, setActiveTab] = useState<"all" | "tutor" | "student">(
    "all",
  );

  // Static user catalog mockup array matrix
  const mockUsers = [
    {
      id: "u1",
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      role: "TUTOR",
      status: "ACTIVE",
      joined: "Mar 12, 2026",
    },
    {
      id: "u2",
      name: "David Chen",
      email: "dchen@example.com",
      role: "STUDENT",
      status: "ACTIVE",
      joined: "Jan 04, 2026",
    },
    {
      id: "u3",
      name: "Elena Rostova",
      email: "elena.ros@example.com",
      role: "TUTOR",
      status: "PENDING",
      joined: "Jun 18, 2026",
    },
    {
      id: "u4",
      name: "Marcus Brody",
      email: "marcus@example.com",
      role: "TUTOR",
      status: "SUSPENDED",
      joined: "Nov 22, 2025",
    },
    {
      id: "u5",
      name: "Amina Rahman",
      email: "amina.r@example.com",
      role: "STUDENT",
      status: "ACTIVE",
      joined: "Feb 19, 2026",
    },
  ];

  // Filtering filter logic based on local component tabs
  const filteredUsers = mockUsers.filter((user) => {
    if (activeTab === "all") return true;
    return user.role.toLowerCase() === activeTab;
  });

  return (
    <div className="space-y-8 w-full animate-fade-in">
      {/* Editorial Page Identification Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            User Accounts Directory
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Search, filter, inspect, and manage authorization levels or
            operational states for all platform members.
          </p>
        </div>
      </div>

      {/* Control Actions & Utility Bar Layout */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-card border border-black/5 dark:border-white/5 p-4 rounded-2xl shadow-xs">
        {/* Left Segment: Role Segmentation Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-black/5 dark:border-white/5">
          {(["all", "tutor", "student"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 h-8 text-[11px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}s
            </button>
          ))}
        </div>

        {/* Right Segment: Search Field Matrix */}
        <div className="relative max-w-xs w-full flex items-center">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search matching email or name..."
            className="w-full h-9 pl-9 pr-4 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-background focus:outline-hidden focus:border-emerald-500/50 dark:focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      {/* User Records Table Container */}
      <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Account Holder</th>
                <th className="px-6 py-4">Security Role</th>
                <th className="px-6 py-4">Platform State</th>
                <th className="px-6 py-4">Enrolled Date</th>
                <th className="px-6 py-4 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                >
                  {/* Column 1: Identity Info Layout */}
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <div className="font-black text-foreground">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-medium">
                        {user.email}
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Security Role Info */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-black tracking-wide px-2 py-0.5 rounded border ${
                        user.role === "TUTOR"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Column 3: Status Indicator Block */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                        user.status === "ACTIVE"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : user.status === "PENDING"
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full fill-current ${
                          user.status === "ACTIVE"
                            ? "bg-emerald-500"
                            : user.status === "PENDING"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>

                  {/* Column 4: Joined Date String */}
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {user.joined}
                  </td>

                  {/* Column 5: Action Controls Group */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === "SUSPENDED" ? (
                        <button className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-emerald-500/10 hover:text-emerald-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors">
                          <CheckCircle className="w-3.5 h-3.5" /> Lift Ban
                        </button>
                      ) : (
                        <button className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-red-500/10 hover:text-red-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors">
                          <Ban className="w-3.5 h-3.5" /> Suspend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
