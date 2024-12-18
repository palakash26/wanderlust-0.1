import React from "react";

function Spinner({ fullHeight = false }: { fullHeight?: boolean }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: fullHeight ? "80vh" : "auto" }}
    >
      <div className="border-solid h-10 w-10 border-4 border-gray-300 border-t-teal-500 animate-spin rounded-full"></div>
    </div>
  );
}

export default Spinner;
