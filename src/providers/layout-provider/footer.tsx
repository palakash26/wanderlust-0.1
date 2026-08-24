"use client";

import React, { useState } from "react";
import Link from "next/link";
import { message } from "antd";
import {
  Compass,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Github,
  Twitter,
  Linkedin,
  Send,
  ShieldCheck,
  Building2,
  Lock,
} from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      message.error("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    setTimeout(() => {
      message.success("Thank you for subscribing to Tripora updates!");
      setEmail("");
      setSubscribing(false);
    }, 600);
  };

  return (
    <footer className="bg-slate-900 text-gray-300 mt-20 border-t border-slate-800">
      {/* Top Banner section */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white py-10 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Subscribe to Special Offers & Discounts
            </h3>
            <p className="text-teal-100 text-sm mt-1">
              Get secret luxury hotel deals sent straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto items-center max-w-md bg-white rounded-full p-1.5 shadow-lg"
          >
            <div className="pl-3 text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 w-full text-gray-800 focus:outline-none text-sm bg-transparent"
              required
            />
            <button
              type="submit"
              disabled={subscribing}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap shadow"
            >
              {subscribing ? "Subscribing..." : "Subscribe"}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-2xl">
            <Compass className="w-8 h-8 text-teal-400" />
            <span>Tripora</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Experience world-class luxury stays, effortless room bookings, and memorable destinations tailored just for you.
          </p>
          <div className="flex items-center gap-3 text-teal-400 mt-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs text-gray-300 font-medium">100% Verified Hotels & Instant Confirmation</span>
          </div>
        </div>

        {/* Quick Links & Admin Access */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">
            Quick Navigation
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-teal-400 transition-colors">
                Explore Rooms & Suites
              </Link>
            </li>
            <li>
              <Link href="/user/bookings" className="hover:text-teal-400 transition-colors">
                My Bookings
              </Link>
            </li>
            <li>
              <Link href="/admin/hotels" className="flex items-center gap-2 hover:text-teal-400 transition-colors text-teal-300 font-medium">
                <Building2 className="w-4 h-4" />
                Hotel Partner Dashboard
              </Link>
            </li>
            <li>
              <Link href="/sign-in" className="flex items-center gap-2 hover:text-teal-400 transition-colors text-teal-300 font-medium">
                <Lock className="w-4 h-4" />
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">
            Contact & Support
          </h4>
          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0" />
              <span>124 Grand Avenue, Suite 400, Mumbai, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-teal-400 flex-shrink-0" />
              <span>support@tripora.com</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold text-base border-b border-slate-800 pb-2">
            Connect With Us
          </h4>
          <p className="text-gray-400 text-sm">
            Follow our social channels for travel inspiration and developer updates.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/AkashPa42525537"
              target="_blank"
              rel="noreferrer"
              title="Twitter / X"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:bg-teal-500 hover:text-white transition-all shadow"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/_pal_akash26/"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:bg-teal-500 hover:text-white transition-all shadow"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/palakash26/"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:bg-teal-500 hover:text-white transition-all shadow"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/akash-pal-29b198279/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:bg-teal-500 hover:text-white transition-all shadow"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800 py-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-8">
        <p>© {currentYear} Tripora Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-3 sm:mt-0">
          <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-gray-300 cursor-pointer">Cookie Settings</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

