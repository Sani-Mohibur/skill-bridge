"use client";

import { useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search routing logic will go here once the search page is live
    if (searchQuery.trim()) {
      window.location.href = `/tutors?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-white">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 md:space-y-8">
        {/* Main Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl">
          Learn from Expert Tutors
        </h1>

        {/* Supporting Subtitle */}
        <p className="max-w-xl text-base md:text-lg text-neutral-600">
          Find specialized engineering and technical knowledge to bridge your
          skills gap. Book structured group sessions with experienced pros.
        </p>

        {/* Search Input Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-lg px-4 sm:px-0"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search subjects (e.g., React, Node.js, Systems)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-4 pr-24 rounded-lg border border-neutral-300 text-sm focus:outline-none focus:border-neutral-950 text-neutral-900 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 h-9 inline-flex items-center justify-center rounded-md bg-neutral-950 px-4 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <Link
            href="/tutors"
            className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-950 px-6 text-sm font-medium text-white hover:bg-neutral-800 transition-colors w-full sm:w-auto"
          >
            Browse All Tutors
          </Link>
          <Link
            href="/register?role=tutor"
            className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-white px-6 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors w-full sm:w-auto"
          >
            Become an Instructor
          </Link>
        </div>
      </div>
    </section>
  );
}
