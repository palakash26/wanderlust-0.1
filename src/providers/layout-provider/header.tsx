"use client";

import { UserType } from "@/interfaces";
import React from "react";
import ProjectTitle from "./project-title";
import UserInfo from "./user-info";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BedDouble, GitGraph, Home, Hotel, List, User } from "lucide-react";

function Header({ loggedInUserData }: { loggedInUserData: UserType | null }) {
  const pathname = usePathname();

  // Define desktop quick navigation links based on user role
  const getNavLinks = () => {
    if (!loggedInUserData) {
      return [
        { label: "Home", href: "/", icon: Home },
      ];
    }

    if (loggedInUserData.isAdmin) {
      return [
        { label: "Home", href: "/", icon: Home },
        { label: "Bookings", href: "/admin/bookings", icon: List },
        { label: "Hotels", href: "/admin/hotels", icon: Hotel },
        { label: "Rooms", href: "/admin/rooms", icon: BedDouble },
        { label: "Reports", href: "/admin/reports", icon: GitGraph },
      ];
    }

    if (loggedInUserData.isSubAdmin) {
      return [
        { label: "Home", href: "/", icon: Home },
        { label: "Bookings", href: "/subadmin/bookings", icon: List },
        { label: "Rooms", href: "/subadmin/rooms", icon: BedDouble },
        { label: "Profile", href: "/subadmin/profile", icon: User },
      ];
    }

    return [
      { label: "Home", href: "/", icon: Home },
      { label: "My Bookings", href: "/user/bookings", icon: List },
      { label: "Profile", href: "/user/profile", icon: User },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-xs mb-6 sm:mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex justify-between items-center py-3">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center">
          <ProjectTitle />
        </div>

        {/* Center: Real-Time Quick Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-teal-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-teal-600 hover:bg-slate-200/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: User Profile or Sign In Button */}
        <div className="flex items-center gap-3">
          {loggedInUserData ? (
            <UserInfo loggedInUserData={loggedInUserData} />
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-5 py-2 rounded-full font-semibold text-xs transition-all shadow-sm hover:shadow-md"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;


