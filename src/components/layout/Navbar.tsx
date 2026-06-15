"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import {
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;

  const navLinks = [
    { name: "Find Tutors", href: "/tutors" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "/about" },
    { name: "Become a Tutor", href: "/register?role=tutor" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full border-b border-border/60 bg-background/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-black tracking-tight text-foreground group transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 fill-white/20" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground group-hover:text-foreground transition-all duration-300">
                Skill Bridge
              </span>
            </Link>
          </div>

          {/* Desktop Central Links */}
          <div className="hidden md:flex items-center space-x-1">
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
                href="#how-it-works"
                className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive("#how-it-works")
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

              {/* Dynamic Link Conditional Assignment */}
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
          </div>

          {/* Desktop Utilities + Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-border/40 bg-background/50 hover:bg-muted hover:text-foreground active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-[18px] h-[18px] text-muted-foreground" />
              ) : (
                <Sun className="w-[18px] h-[18px] text-yellow-500" />
              )}
            </Button>

            <div className="h-4 w-[1px] bg-border/60 mx-1" />

            {!isLoggedIn ? (
              <>
                <Link href="/login" passHref>
                  <Button
                    variant="ghost"
                    className="text-xs font-bold tracking-wide rounded-xl h-9 px-4 cursor-pointer bg-gray-400 hover:bg-slate-200/90 dark:bg-muted/50 dark:hover:bg-muted/80 text-slate-900 dark:text-foreground transition-all"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/register" passHref>
                  <Button className="text-xs font-bold tracking-wide rounded-xl h-9 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-sm cursor-pointer border-none">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/dashboard" passHref>
                  <Button
                    variant="outline"
                    className="text-xs font-bold tracking-wide rounded-xl h-9 gap-1.5 cursor-pointer border-border/60 hover:bg-muted/40"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Button>
                </Link>

                {/* Profile Avatar Container */}
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-9 h-9 rounded-xl object-cover border border-border/80 shadow-inner"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black border border-emerald-500/20 shadow-xs">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={async () => {
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          toast.success(
                            "Logged out successfully. See you soon!",
                          );
                          router.push("/login");
                          router.refresh();
                        },
                      },
                    });
                  }}
                  className="w-9 h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Utility Row */}
          <div className="flex md:hidden items-center space-x-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-border/40 bg-background/40 cursor-pointer"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-500" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Glassmorphic Slide Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-border/60 bg-background/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-1.5 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <Link
            href="/tutors"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
              isActive("/tutors")
                ? "text-emerald-500 bg-emerald-500/5"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            Find Tutors
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
              isActive("#how-it-works")
                ? "text-emerald-500 bg-emerald-500/5"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            How It Works
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
              isActive("/about")
                ? "text-emerald-500 bg-emerald-500/5"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            About
          </Link>

          {isLoggedIn ? (
            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                isActive("/bookings")
                  ? "text-emerald-500 bg-emerald-500/5"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              Bookings
            </Link>
          ) : (
            <Link
              href="/register?role=tutor"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                isActive("/register")
                  ? "text-emerald-500 bg-emerald-500/5"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              Become a Tutor
            </Link>
          )}

          <div className="pt-4 mt-2 border-t border-border/60 flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} passHref>
                  <Button
                    variant="outline"
                    className="w-full text-sm font-bold tracking-wide h-10 rounded-xl cursor-pointer border-border/80 hover:bg-muted/50 transition-colors"
                  >
                    Log In
                  </Button>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  passHref
                >
                  <Button className="w-full text-sm font-bold tracking-wide h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white cursor-pointer border-none">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2.5">
                {/* Profile Header Card inside Drawer */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/40">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-10 h-10 rounded-xl object-cover border border-border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm font-black border border-emerald-500/20">
                      {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground truncate max-w-[180px]">
                      {session?.user?.name || "Workspace Member"}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  passHref
                >
                  <Button
                    variant="outline"
                    className="w-full text-sm font-bold tracking-wide h-10 rounded-xl gap-2 cursor-pointer border-border/60"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  onClick={async () => {
                    setIsOpen(false);
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          toast.success(
                            "Logged out successfully. See you soon!",
                          );
                          router.push("/login");
                          router.refresh();
                        },
                      },
                    });
                  }}
                  className="w-full text-sm font-bold tracking-wide h-10 rounded-xl text-destructive hover:bg-destructive/5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect Account
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
