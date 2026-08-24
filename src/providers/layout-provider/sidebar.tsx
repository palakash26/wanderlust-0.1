import { UserType } from "@/interfaces";
import { useAuth } from "@clerk/nextjs";
import { Drawer } from "antd";
import { BedDouble, GitGraph, Home, Hotel, List, LogOut, ShieldCheck, User, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Sidebar({
  showSidebar,
  setShowSidebar,
  loggedInUserData,
}: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUserData: UserType;
}) {
  const iconSize = 18;
  const router = useRouter();
  const pathname = usePathname();

  const { signOut } = useAuth();

  const onLogout = async () => {
    await signOut();
    setShowSidebar(false);
    router.push("/sign-in");
  };

  const userMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onclick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "My Bookings",
      icon: <List size={iconSize} />,
      onclick: () => router.push("/user/bookings"),
      isActive: pathname === "/user/bookings",
    },
    {
      name: "My Profile",
      icon: <User size={iconSize} />,
      onclick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ];

  const adminMenuItems: any[] = [
    {
      name: "Home Overview",
      icon: <Home size={iconSize} />,
      onclick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "All Bookings",
      icon: <List size={iconSize} />,
      onclick: () => router.push("/admin/bookings"),
      isActive: pathname === "/admin/bookings",
    },
    {
      name: "Hotel Management",
      icon: <Hotel size={iconSize} />,
      onclick: () => router.push("/admin/hotels"),
      isActive: pathname.includes("/admin/hotels"),
    },
    {
      name: "Room Inventory",
      icon: <BedDouble size={iconSize} />,
      onclick: () => router.push("/admin/rooms"),
      isActive: pathname.includes("/admin/rooms"),
    },
    {
      name: "User Management",
      icon: <User2 size={iconSize} />,
      onclick: () => router.push("/admin/users"),
      isActive: pathname.includes("/admin/users"),
    },
    {
      name: "Analytics & Reports",
      icon: <GitGraph size={iconSize} />,
      onclick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
  ];

  const subAdminMenuItems: any[] = [
    {
      name: "Home Overview",
      icon: <Home size={iconSize} />,
      onclick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onclick: () => router.push("/subadmin/bookings"),
      isActive: pathname === "/subadmin/bookings",
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onclick: () => router.push("/subadmin/rooms"),
      isActive: pathname.includes("/subadmin/rooms"),
    },
    {
      name: "Users",
      icon: <User2 size={iconSize} />,
      onclick: () => router.push("/subadmin/users"),
      isActive: pathname.includes("/subadmin/users"),
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onclick: () => router.push("/subadmin/profile"),
      isActive: pathname === "/subadmin/profile",
    },
  ];

  const menuItemsToShow: any[] = loggedInUserData.isAdmin
    ? adminMenuItems
    : loggedInUserData.isSubAdmin
    ? subAdminMenuItems
    : userMenuItems;

  const getInitials = (name: string) => {
    return (name || "User")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Drawer
      open={showSidebar}
      onClose={() => setShowSidebar(false)}
      closable
      width={300}
      title={
        <div className="flex items-center gap-3 py-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-bold text-sm flex items-center justify-center shadow-sm">
            {getInitials(loggedInUserData?.name)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-snug">
              {loggedInUserData?.name || "Account"}
            </span>
            <span className="text-xs text-teal-600 font-medium capitalize">
              {loggedInUserData.isAdmin
                ? "System Administrator"
                : loggedInUserData.isSubAdmin
                ? "Sub-Admin Manager"
                : "Guest Traveler"}
            </span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col justify-between h-full py-2">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-1">
            Navigation Menu
          </span>
          {menuItemsToShow.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                item.onclick();
                setShowSidebar(false);
              }}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                item.isActive
                  ? "bg-teal-500 text-white shadow-sm font-semibold"
                  : "text-slate-700 hover:bg-slate-100 hover:text-teal-600"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  item.isActive ? "bg-teal-600/50 text-white" : "text-slate-500"
                }`}
              >
                {item.icon}
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 hover:text-red-700 transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default Sidebar;

