"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface MobileDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pathname: string;
  isLoggedIn: boolean;
  session: any;
}

export function MobileDrawer({
  isOpen,
  setIsOpen,
  pathname,
  isLoggedIn,
  session,
}: MobileDrawerProps) {
  const router = useRouter();
  const isActive = (path: string) => pathname === path;

  if (!isOpen) return null;

  return (
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
        href="/how-it-works"
        onClick={() => setIsOpen(false)}
        className={`block px-3 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
          isActive("/how-it-works")
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
            <Link href="/register" onClick={() => setIsOpen(false)} passHref>
              <Button className="w-full text-sm font-bold tracking-wide h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white cursor-pointer border-none">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex flex-col gap-2.5">
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

            <Link href="/profile" onClick={() => setIsOpen(false)} passHref>
              <Button
                variant="outline"
                className="w-full text-sm font-bold tracking-wide h-10 rounded-xl gap-2 cursor-pointer border-border/60 justify-start px-4"
              >
                <User className="w-4 h-4 text-emerald-500" />
                My Profile
              </Button>
            </Link>

            <Link href="/dashboard" onClick={() => setIsOpen(false)} passHref>
              <Button
                variant="outline"
                className="w-full text-sm font-bold tracking-wide h-10 rounded-xl gap-2 cursor-pointer border-border/60 justify-start px-4"
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
                      toast.success("Logged out successfully. See you soon!");
                      router.push("/login");
                      router.refresh();
                    },
                  },
                });
              }}
              className="w-full text-sm font-bold tracking-wide h-10 rounded-xl text-destructive hover:bg-destructive/5 cursor-pointer flex items-center justify-start px-4 gap-2"
            >
              <LogOut className="w-4 h-4" />
              Disconnect Account
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
