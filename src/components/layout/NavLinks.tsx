"use client";

import React from "react";
import Link from "next/link";

interface NavLinksProps {
  pathname: string;
  isLoggedIn: boolean;
}

export function NavLinks({ pathname, isLoggedIn }: NavLinksProps) {
  const isActive = (path: string) => pathname === path;

  return (
    <div className="hidden md:flex items-center space-x-1">
      <Link
        href="/tutors"
        className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
          isActive("/tutors")
            ? "text-emerald-500 bg-emerald-500/5"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
        }`}
      >
        Find Tutors
      </Link>
      <Link
        href="/how-it-works"
        className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
          isActive("/how-it-works")
            ? "text-emerald-500 bg-emerald-500/5"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
        }`}
      >
        How It Works
      </Link>
      <Link
        href="/about"
        className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
          isActive("/about")
            ? "text-emerald-500 bg-emerald-500/5"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
        }`}
      >
        About
      </Link>

      {isLoggedIn ? (
        <Link
          href="/bookings"
          className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
            isActive("/bookings")
              ? "text-emerald-500 bg-emerald-500/5"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          }`}
        >
          Bookings
        </Link>
      ) : (
        <Link
          href="/register?role=tutor"
          className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
            isActive("/register")
              ? "text-emerald-500 bg-emerald-500/5"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          }`}
        >
          Become a Tutor
        </Link>
      )}
    </div>
  );
}
