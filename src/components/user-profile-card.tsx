"use client";

import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  User,
  Mail,
  Shield,
  Calendar,
  BedDouble,
  Fingerprint,
  CheckCheck,
} from "lucide-react";

interface UserProfileCardProps {
  user: any;
  bookingsCount: number;
}

export default function UserProfileCard({
  user,
  bookingsCount,
}: UserProfileCardProps) {
  const roleLabel = user.isAdmin
    ? "Admin"
    : user.isSubAdmin
    ? "Sub-admin"
    : "Guest Member";

  const getRoleBadgeColor = () => {
    if (user.isAdmin) return "bg-purple-100 text-purple-700 border-purple-200";
    if (user.isSubAdmin) return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formattedDate = dayjs(user.createdAt || user.createAt).isValid()
    ? dayjs(user.createdAt || user.createAt).format("MMM DD, YYYY")
    : "Recent";

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 my-6">
      {/* Top Banner & Avatar Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Cover Gradient */}
        <div className="h-36 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Profile Details Header */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col md:flex-row items-center md:items-end justify-between gap-4 -mt-16">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-slate-900 border-4 border-white shadow-md flex items-center justify-center text-teal-400 text-3xl font-extrabold tracking-wider">
                {getInitials(user.name)}
              </div>
              <span
                title="Account Active"
                className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"
              ></span>
            </div>

            {/* Name & Role */}
            <div className="mb-1">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <span
                  className={`text-xs px-3 py-1 font-semibold rounded-full border ${getRoleBadgeColor()}`}
                >
                  {roleLabel}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/user/bookings"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-medium text-sm transition-all shadow-sm"
            >
              <BedDouble className="w-4 h-4" />
              My Bookings ({bookingsCount})
            </Link>
          </div>
        </div>
      </div>

      {/* Highlights Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <BedDouble className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Reservations</p>
            <p className="text-2xl font-bold text-gray-900">{bookingsCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Joined Date</p>
            <p className="text-lg font-bold text-gray-900">{formattedDate}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Account Access</p>
            <p className="text-lg font-bold text-gray-900">{roleLabel}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Account Status</p>
            <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
              Verified
            </p>
          </div>
        </div>
      </div>

      {/* Account Details Box */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
          <User className="w-5 h-5 text-teal-500" /> Personal Profile Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <User className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Full Name
              </span>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {user.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email Address
              </span>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <Fingerprint className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="overflow-hidden">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Membership ID
              </span>
              <p className="text-xs font-mono font-semibold text-teal-700 bg-teal-50/80 px-2.5 py-1 rounded-md border border-teal-100/80 mt-1 inline-block">
                {user._id ? `TRP-${user._id.toString().slice(-8).toUpperCase().slice(0, 4)}-${user._id.toString().slice(-4).toUpperCase()}` : "TRP-MEMBER"}
              </p>
            </div>
          </div>


          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
            <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Assigned Role
              </span>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">
                {roleLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
