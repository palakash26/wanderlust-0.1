'use client'
import { Button } from 'antd';
import dayjs from 'dayjs';
import { FilterX, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

function ReportsFilters({searchParams}:{searchParams:any}) {
  const [startDate,setStartDate] = React.useState(searchParams.startDate || "");
  const [endDate,setEndDate] = React.useState(searchParams.endDate || "");
const router = useRouter();

// Get today's date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split("T")[0];

  const onGetData = ()=>{
    const newSearchParamsObject = { ...searchParams, startDate, endDate };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    router.push(`/admin/reports?${newSearchParams}`);
  };
  const onClear = ()=>{
    setStartDate("");
    setEndDate("");
    router.push("/admin/reports");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5 items-end mt-10">
      {/* Check-In Date Input */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Start Date</label>
        <input
          type="date"
          placeholder="Check-in"
          className="h-10 px-6 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={startDate}
          min={dayjs().format("YYYY-MM-DD")}
          // min={currentDate}   //min={currentDate} {/* Restrict to current date or later */}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* Check-Out Date Input */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm"> End Date</label>
        <input
          type="date"
          placeholder="Check-out"
          className="h-10 px-6 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={endDate}
          min={dayjs().format("YYYY-MM-DD")}
          // min={currentDate}   //min={currentDate} {/* Restrict to current date or later */}
          onChange={(e) => setEndDate(e.target.value)}
        />
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
          onClick={onGetData}
          disabled={!startDate || !endDate}
        >
          Get Data
        </Button>
      </div>
    </div>
  )
}

export default ReportsFilters