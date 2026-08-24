import React from "react";

export function RoomSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-200 rounded-t-lg overflow-hidden bg-white shadow-sm"
        >
          {/* Image placeholder */}
          <div className="w-full h-64 bg-gray-200"></div>

          {/* Details placeholder */}
          <div className="p-4 flex flex-col gap-3">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <hr className="border-gray-100 my-1" />
            <div className="flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4 animate-pulse mt-5">
      <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex gap-4 py-3 border-b border-gray-100">
          <div className="h-6 bg-gray-200 rounded flex-1"></div>
          <div className="h-6 bg-gray-100 rounded flex-1"></div>
          <div className="h-6 bg-gray-200 rounded flex-1"></div>
          <div className="h-6 bg-gray-100 rounded flex-1"></div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 animate-pulse">
      {/* Top bar / title placeholder */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>

      {/* Grid of content */}
      <RoomSkeletonGrid count={6} />
    </div>
  );
}

export default PageSkeleton;
