"use client";

import { useState } from "react";
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminTutorVerificationsPage() {
  // Tutors are the primary focus for verification, filtering by validation status
  const [verificationFilter, setVerificationFilter] = useState<
    "all" | "verified" | "unverified"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Static mockup array representing tutor profiles
  const mockTutors = [
    {
      id: "t1",
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      isVerified: true,
      enrolledDate: "Mar 12, 2026",
    },
    {
      id: "t2",
      name: "Elena Rostova",
      email: "elena.ros@example.com",
      isVerified: false,
      enrolledDate: "Jun 18, 2026",
    },
    {
      id: "t3",
      name: "Marcus Brody",
      email: "marcus@example.com",
      isVerified: false,
      enrolledDate: "Nov 22, 2025",
    },
    {
      id: "t4",
      name: "Dr. Aris Thorne",
      email: "thorne.a@example.com",
      isVerified: true,
      enrolledDate: "Feb 02, 2026",
    },
  ];

  // Filtering logic matching verification state and search queries
  const filteredTutors = mockTutors.filter((tutor) => {
    const matchesVerification =
      verificationFilter === "all" ||
      (verificationFilter === "verified" && tutor.isVerified) ||
      (verificationFilter === "unverified" && !tutor.isVerified);

    const matchesSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesVerification && matchesSearch;
  });

  return (
    <div className="space-y-8 w-full animate-fade-in">
      {/* Editorial Page Identification Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Tutor Verifications
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review background credentials, manage approval standings, and toggle
            official verification badges.
          </p>
        </div>
      </div>

      {/* Control Actions & Utility Bar Layout */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-card border border-black/5 dark:border-white/5 p-4 rounded-2xl shadow-xs">
        {/* Left Segment: Verification State Segmented Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-black/5 dark:border-white/5">
          {(["all", "verified", "unverified"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setVerificationFilter(tab)}
              className={`px-4 h-8 text-[11px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                verificationFilter === tab
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "all" ? "All Tutors" : tab}
            </button>
          ))}
        </div>

        {/* Right Segment: Search Field Matrix */}
        <div className="relative max-w-xs w-full flex items-center">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name or email..."
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
                <th className="px-6 py-4">Tutor Profile</th>
                <th className="px-6 py-4">Verification State</th>
                <th className="px-6 py-4">Enrolled Date</th>
                <th className="px-6 py-4 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {filteredTutors.map((tutor) => (
                <tr
                  key={tutor.id}
                  className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                >
                  {/* Column 1: Identity Info Layout */}
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <div className="font-black text-foreground">
                        {tutor.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-medium">
                        {tutor.email}
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Status Indicator Block */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                        tutor.isVerified
                          ? "text-emerald-600 dark:text-blue-500"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {tutor.isVerified ? (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-blue-500" />
                          VERIFIED
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-4 h-4 text-amber-500" />
                          UNVERIFIED
                        </>
                      )}
                    </span>
                  </td>

                  {/* Column 3: Enrolled Date String */}
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {tutor.enrolledDate}
                  </td>

                  {/* Column 4: Action Controls Group */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {tutor.isVerified ? (
                        <button className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-red-500/10 hover:text-red-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors">
                          <XCircle className="w-3.5 h-3.5" /> Revoke
                          Verification
                        </button>
                      ) : (
                        <button className="h-7 px-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-emerald-500/10 hover:text-emerald-600 text-foreground text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors">
                          <CheckCircle className="w-3.5 h-3.5" /> Grant
                          Verification
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTutors.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No matching profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
