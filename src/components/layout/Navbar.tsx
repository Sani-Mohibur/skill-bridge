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
    <nav className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-neutral-950"
            >
              Skill Bridge
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/tutors"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              Find Tutors
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/register?role=tutor"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              Become a Tutor
            </Link>
          </div>

          {/* Desktop Theme + Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <Link
              href="/login"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
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
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/tutors"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
          >
            Find Tutors
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
          >
            How It Works
          </Link>
          <Link
            href="/register?role=tutor"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"
          >
            Become a Tutor
          </Link>
          <div className="pt-4 border-t border-neutral-200 flex flex-col space-y-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block text-center px-3 py-2 rounded-md text-base font-medium bg-neutral-950 text-white hover:bg-neutral-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
