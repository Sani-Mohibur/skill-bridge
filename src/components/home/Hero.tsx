"use client";

import { useState } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/tutors?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-28 bg-background relative overflow-hidden">
      {/* Dynamic ambient grid overlay decoration for an engineering feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-card-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-card-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15] dark:opacity-[0.07] pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 md:space-y-8 relative z-10 px-4">
        {/* Main Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl max-w-3xl leading-[1.1]">
          Learn from <span className="text-brand-accent">Expert Tutors</span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="max-w-xl text-base md:text-lg text-muted-text leading-relaxed">
          Find specialized engineering and technical knowledge to bridge your
          skills gap. Book structured group sessions with experienced pros.
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-lg pt-2">
          <div className="relative flex items-center group">
            <input
              type="text"
              placeholder="Search subjects (e.g., React, Node.js, Systems)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-5 pr-28 rounded-xl border border-card-border bg-card text-sm text-foreground placeholder:text-muted-text/70 focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 transition-all shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 h-9 inline-flex items-center justify-center rounded-lg bg-brand-accent px-4 text-xs font-semibold text-white hover:bg-brand-hover active:scale-[0.97] transition-all cursor-pointer shadow-sm"
            >
              Search
            </button>
          </div>
        </form>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto justify-center">
          <a
            href="/tutors"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-foreground text-background px-6 text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all w-full sm:w-auto shadow-sm"
          >
            Browse All Tutors
          </a>
          <a
            href="/register?role=tutor"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-card-border bg-card px-6 text-sm font-medium text-foreground hover:bg-muted-surface active:scale-[0.98] transition-all w-full sm:w-auto"
          >
            Become an Instructor
          </a>
        </div>
      </div>
    </section>
  );
}
