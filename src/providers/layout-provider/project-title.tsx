"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Compass } from "lucide-react";

function ProjectTitle() {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2.5 cursor-pointer group"
      onClick={() => {
        router.push("/");
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
        <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
          Tripora
        </span>

        <span className="text-[10px] uppercase font-semibold text-gray-400 -mt-1 tracking-widest">
          Luxury Stays
        </span>
      </div>
    </div>
  );
}

export default ProjectTitle;

