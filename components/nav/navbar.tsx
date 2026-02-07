"use client";

import Link from "next/link";
import { Shield, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { resetAuthCookies } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await resetAuthCookies();
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-emerald-500 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 h-8 w-8 bg-emerald-500/20 blur-lg rounded-full" />
            </div>
            <span className="text-xl font-bold tracking-wider">
              TRUST<span className="text-emerald-500">MBR</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/businesses"
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              BUSINESSES
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                ADMIN
              </Link>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-9 w-24 bg-muted/20 rounded-lg animate-pulse" />
            ) : user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 tracking-wide"
                  >
                    DASHBOARD
                  </Button>
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-border">
                  <Avatar
                    onClick={() => router.push("/profile")}
                    className="h-8 w-8 border border-border"
                  >
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-500 text-xs">
                      {user?.full_name?.slice(0, 2).toUpperCase() ||
                        user?.email?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="tracking-wide"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    LOGOUT
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="tracking-wide">
                    LOG IN
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 tracking-wide"
                  >
                    SIGN UP
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border/40">
            <Link
              href="/"
              className="block text-sm tracking-wide text-muted-foreground hover:text-foreground"
            >
              HOME
            </Link>
            <Link
              href="/businesses"
              className="block text-sm tracking-wide text-muted-foreground hover:text-foreground"
            >
              BUSINESSES
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="block text-sm tracking-wide text-muted-foreground hover:text-foreground"
              >
                ADMIN
              </Link>
            )}
            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/40">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback className="bg-emerald-500/20 text-emerald-500 text-xs">
                        {user?.full_name?.slice(0, 2).toUpperCase() ||
                          user?.email?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                      {user?.full_name || user?.email}
                    </span>
                  </div>
                  <Link href="/businesses/register" className="block">
                    <Button
                      size="sm"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 tracking-wide"
                    >
                      REGISTER BUSINESS
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full tracking-wide"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    LOGOUT
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full tracking-wide"
                    >
                      LOG IN
                    </Button>
                  </Link>
                  <Link href="/signup" className="block">
                    <Button
                      size="sm"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 tracking-wide"
                    >
                      SIGN UP
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
