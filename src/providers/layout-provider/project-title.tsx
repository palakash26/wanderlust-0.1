import React from "react";
import { useRouter } from "next/navigation";

function ProjectTitle() {
  const router = useRouter(); // Call useRouter as a function

  return (
    <div
      className="p-3 text-2xl font-bold text-teal-500 cursor-pointer" // Added cursor-pointer for better UX
      onClick={() => {
        router.push("/");
      }}
    >
      Wanderlust
    </div>
  );
}

export default ProjectTitle;
