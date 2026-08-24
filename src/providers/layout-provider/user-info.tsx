import { UserType } from "@/interfaces";
import { ChevronDown, Menu, ShieldCheck, UserCheck } from "lucide-react";
import React from "react";
import Sidebar from "./sidebar";

function UserInfo({ loggedInUserData }: { loggedInUserData: UserType }) {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const displayName = loggedInUserData.name || "User";
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = () => {
    if (loggedInUserData.isAdmin) {
      return (
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
          <ShieldCheck className="w-3 h-3 text-amber-600" />
          Admin
        </span>
      );
    }
    if (loggedInUserData.isSubAdmin) {
      return (
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
          <UserCheck className="w-3 h-3 text-blue-600" />
          Sub Admin
        </span>
      );
    }
    return (
      <span className="hidden sm:inline-flex text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
        Guest
      </span>
    );
  };

  return (
    <>
      <div
        onClick={() => setShowSidebar(!showSidebar)}
        className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/70 cursor-pointer transition-all duration-200 shadow-xs group"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
            {getInitials(displayName)}
          </div>
          {/* Live Online Indicator Dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-gray-800 group-hover:text-teal-600 transition-colors max-w-[120px] truncate">
              {displayName}
            </span>
            {getRoleBadge()}
          </div>
        </div>

        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-500 group-hover:text-teal-600 shadow-xs border border-gray-100">
          <Menu className="w-4 h-4" />
        </div>
      </div>

      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          loggedInUserData={loggedInUserData}
        />
      )}
    </>
  );
}

export default UserInfo;

