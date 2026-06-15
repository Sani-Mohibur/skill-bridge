"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Temporary guest state for layout visualization (we will connect backend auth later)
  const isLoggedIn = false;

  return (
    <nav className="w-full border-b border-card-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight text-foreground hover:text-brand-accent transition-colors"
            >
              Skill Bridge
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/tutors"
              className="text-sm font-medium text-muted-text hover:text-foreground transition-colors"
            >
              Find Tutors
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-text hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/register?role=tutor"
              className="text-sm font-medium text-muted-text hover:text-foreground transition-colors"
            >
              Become a Tutor
            </Link>
          </div>

          {/* Desktop Theme + Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-card-border bg-card text-foreground hover:bg-muted-surface active:scale-[0.95] transition-all cursor-pointer text-sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <Link
              href="/login"
              className="text-sm font-medium text-muted-text hover:text-foreground transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-foreground text-background px-4 text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-card-border bg-card text-foreground text-sm cursor-pointer"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-muted-text hover:text-foreground hover:bg-muted-surface focus:outline-none cursor-pointer transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-card-border bg-card px-4 pt-2 pb-5 space-y-1 shadow-md">
          <Link
            href="/tutors"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-muted-text hover:bg-muted-surface hover:text-foreground transition-all"
          >
            Find Tutors
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-muted-text hover:bg-muted-surface hover:text-foreground transition-all"
          >
            How It Works
          </Link>
          <Link
            href="/register?role=tutor"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-muted-text hover:bg-muted-surface hover:text-foreground transition-all"
          >
            Become a Tutor
          </Link>
          <div className="pt-4 mt-2 border-t border-card-border flex flex-col space-y-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center px-3 py-2.5 rounded-lg text-base font-medium text-muted-text hover:bg-muted-surface transition-all"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block text-center px-3 py-2.5 rounded-lg text-base font-semibold bg-foreground text-background shadow-xs active:scale-[0.98] transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
