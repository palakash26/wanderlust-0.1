"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Compass, 
  Home, 
  ArrowLeft, 
  Search, 
  BedDouble, 
  CalendarCheck, 
  Sparkles,
  MapPin,
  HelpCircle
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-12 -left-12 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-12 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-teal-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-3xl w-full mx-auto text-center px-4">
        
        {/* Animated Badge & Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative inline-block mb-6"
        >
          {/* Compass Icon Badge */}
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 flex items-center justify-center text-white shadow-xl shadow-teal-500/25 ring-8 ring-white/80">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <Compass className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.75]" />
            </motion.div>
          </div>

          {/* Floating Decor Pins */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-2 -right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-100 text-teal-700 text-xs font-semibold flex items-center gap-1 z-20"
          >
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Off Route</span>
          </motion.div>

          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-1 -left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-100 text-amber-600 text-xs font-semibold flex items-center gap-1 z-20"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>404 Error</span>
          </motion.div>
        </motion.div>

        {/* Large 404 Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-teal-700 via-teal-500 to-emerald-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm select-none">
            404
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-1 mb-3">
            Oops! Destination Not Found
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            The page you are looking for doesn’t exist or may have taken a temporary vacation. Let’s get you back on track to booking your dream stay.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-md mx-auto relative flex items-center"
        >
          <div className="relative w-full shadow-sm rounded-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search luxury rooms, suites, or locations..."
              className="w-full pl-11 pr-28 py-3 bg-white border border-slate-200 rounded-full text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-full transition-colors shadow-sm"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Helpful Shortcut Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-slate-200/80"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Popular Destinations on Tripora
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <Link
              href="/"
              className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200 flex items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
                <BedDouble className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                  Explore Suites
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  View all available rooms & prices
                </p>
              </div>
            </Link>

            <Link
              href="/user/bookings"
              className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200 flex items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                  My Bookings
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage active reservations
                </p>
              </div>
            </Link>

            <Link
              href="/user/profile"
              className="group p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200 flex items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                  User Profile
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update account & preferences
                </p>
              </div>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
