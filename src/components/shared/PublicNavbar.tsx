"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  Calendar,
  User,
  LogOut,
  Plus,
  LayoutDashboard,
  Users,
  Shield,
  Compass,
} from "lucide-react";

import { Button } from "@/components/ui/button";
// import { useAuth } from "@/hooks/useAuth";

export default function PublicNavbar() {
  // const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const isAuthenticated = true
const user = {role:'ADMIN'}
  const handleLogout = () => {
    // logout();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive(path)
        ? "bg-primary text-primary-foreground"
        : "text-foreground hover:bg-accent hover:text-accent-foreground"
    }`;

  const renderNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link href="/explore" className={linkClass("/explore")}>
            <Compass className="w-4 h-4" />
            Explore Events
          </Link>
          <Link href="/register" className={linkClass("/register")}>
            Become a Host
          </Link>
        </>
      );
    }

    if (user?.role === "ADMIN") {
      return (
        <>
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <LayoutDashboard className="w-4 h-4" />
            Admin Dashboard
          </Link>

          <Link
            href="/dashboard?tab=users"
            className={linkClass("/dashboard?tab=users")}
          >
            <Users className="w-4 h-4" />
            Manage Users
          </Link>

          <Link
            href="/dashboard?tab=hosts"
            className={linkClass("/dashboard?tab=hosts")}
          >
            <Shield className="w-4 h-4" />
            Manage Hosts
          </Link>

          <Link
            href="/dashboard?tab=events"
            className={linkClass("/dashboard?tab=events")}
          >
            <Calendar className="w-4 h-4" />
            Manage Events
          </Link>
        </>
      );
    }

    if (user?.role === "HOST") {
      return (
        <>
          <Link href="/explore" className={linkClass("/explore")}>
            <Compass className="w-4 h-4" />
            Explore Events
          </Link>

          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <Calendar className="w-4 h-4" />
            My Events (Hosted)
          </Link>

          <Link
            href="/dashboard?tab=create"
            className={linkClass("/dashboard?tab=create")}
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Link>
        </>
      );
    }

    return (
      <>
        <Link href="/explore" className={linkClass("/explore")}>
          <Compass className="w-4 h-4" />
          Explore Events
        </Link>

        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <Calendar className="w-4 h-4" />
          My Events
        </Link>
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {renderNavLinks()}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href={`/profile/${user?.id}`}
                  className={linkClass(`/profile/${user?.id}`)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {renderNavLinks()}

              <div className="border-t border-border my-2" />

              {isAuthenticated ? (
                <>
                  <Link
                    href={`/profile/${user?.id}`}
                    className={linkClass(`/profile/${user?.id}`)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={linkClass("/login")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className={linkClass("/register")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
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
