"use client";

import { Star, StarOff, ShieldCheck, ArrowUpRight, Search } from "lucide-react";

export default function AdminFeaturedTutorsPage() {
  // Static placeholder array for featured dashboard control layout mockup
  const mockTutors = [
    {
      id: "t1",
      name: "Sarah Jenkins",
      title: "MERN Stack Expert",
      rating: 4.9,
      reviews: 42,
      isFeatured: true,
    },
    {
      id: "t2",
      name: "David Chen",
      title: "Systems Engineer",
      rating: 4.8,
      reviews: 19,
      isFeatured: true,
    },
    {
      id: "t3",
      name: "Elena Rostova",
      title: "Data Scientist",
      rating: 5.0,
      reviews: 31,
      isFeatured: false,
    },
    {
      id: "t4",
      name: "Marcus Brody",
      title: "Security Specialist",
      rating: 4.7,
      reviews: 14,
      isFeatured: false,
    },
  ];

  return (
    <div className="space-y-8 w-full animate-fade-in">
      {/* Editorial Page Identification Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Featured Spotlights Manager
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Promote or demote elite verified partner accounts directly to the main
          system homepage discoverability vectors.
        </p>
      </div>

      {/* Control Actions Configuration Panel Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-card border border-black/5 dark:border-white/5 p-4 rounded-2xl shadow-xs">
        <div className="text-xs font-bold text-muted-foreground">
          Showing {mockTutors.length} total active instructor records
        </div>

        <div className="relative max-w-xs w-full flex items-center">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search matching names..."
            className="w-full h-9 pl-9 pr-4 text-xs rounded-xl border border-black/10 dark:border-white/10 bg-background focus:outline-hidden focus:border-emerald-500/50 dark:focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Tutors Setup Matrix Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTutors.map((tutor) => (
          <div
            key={tutor.id}
            className={`bg-card border rounded-2xl p-5 shadow-xs flex justify-between items-start gap-4 transition-all relative overflow-hidden ${
              tutor.isFeatured
                ? "border-amber-500/30 dark:border-blue-500/40"
                : "border-black/5 dark:border-white/5"
            }`}
          >
            {/* Left Content Column */}
            <div className="space-y-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-foreground">
                    {tutor.name}
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-blue-400 fill-emerald-500/10 dark:fill-blue-500/10" />
                </div>
                <p className="text-xs font-bold text-muted-foreground">
                  {tutor.title}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground">
                <span className="flex items-center gap-0.5 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" /> {tutor.rating}
                </span>
                <span>({tutor.reviews} reviews)</span>
              </div>
            </div>

            {/* Right Action Trigger Column */}
            <div className="flex flex-col items-end justify-between h-full min-h-[76px] shrink-0">
              <a
                href={`/tutors/${tutor.id}`}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {tutor.isFeatured ? (
                <button className="h-7 px-2.5 text-[10px] font-bold rounded-lg border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 flex items-center gap-1 transition-colors hover:bg-red-500/20 cursor-pointer">
                  <StarOff className="w-3.5 h-3.5" /> Remove Spotlight
                </button>
              ) : (
                <button className="h-7 px-2.5 text-[10px] font-bold rounded-lg border border-black/10 dark:border-white/10 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 text-foreground flex items-center gap-1 transition-colors cursor-pointer">
                  <Star className="w-3.5 h-3.5" /> Feature on Home
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
