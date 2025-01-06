"use client";
import { Button } from "antd";
import { FilterX, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Filters({ searchParams }: { searchParams: any }) {
  const [checkIn, setCheckIn] = React.useState(searchParams.checkIn || "");
  const [checkOut, setCheckOut] = React.useState(searchParams.checkOut || "");
  const [type, setType] = React.useState(searchParams.type || "");
  const router = useRouter();


    // Get today's date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split("T")[0];

  const onSearch = () => {
    const newSearchParamsObject = { ...searchParams, checkIn, checkOut, type };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    router.push(`/?${newSearchParams}`);
  };

  const onClear = () => {
    setCheckIn("");
    setCheckOut("");
    setType("");
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5 items-end">
      {/* Check-In Date Input */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Check In Date</label>
        <input
          type="date"
          placeholder="Check-in"
          className="h-10 px-6 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={checkIn}
          min={currentDate}   //min={currentDate} {/* Restrict to current date or later */}
          // max={currentDate} // Restrict to current date
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      {/* Check-Out Date Input */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Check Out Date</label>
        <input
          type="date"
          placeholder="Check-out"
          className="h-10 px-6 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={checkOut}
          min={currentDate}   //min={currentDate} {/* Restrict to current date or later */}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      {/* Type Selector */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Type</label>
        <select
          className="h-10 px-6 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="delux">Delux</option>
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-5">
        <Button
          icon={<FilterX size={20} />}
          className="h-10 px-6 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center"
          onClick={onClear}
        >
          Clear
        </Button>
        <Button
          icon={<Search size={20} />}
          className="h-10 px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center"
          onClick={onSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default Filters;
