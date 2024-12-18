import { UserType } from "@/interfaces";
import { useAuth } from "@clerk/nextjs";
import { Drawer } from "antd";
import { BedDouble, GitGraph, Home, Hotel, List, User, User2 } from "lucide-react";
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
  const iconSize = 20;
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
      name: "Booking",
      icon: <List size={iconSize} />,
      onclick: () => router.push("/user/bookings"),
      isActive: pathname === "/user/bookings",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onclick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ];
  const adminMenuItems: any[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onclick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Booking",
      icon: <List size={iconSize} />,
      onclick: () => router.push("/admin/bookings"),
      isActive: pathname === "/admin/bookings",
    },
    {
      name: "Hotels",
      icon: <Hotel size={iconSize} />,
      onclick: () => router.push("/admin/hotels"),
      isActive: pathname.includes("/admin/hotels"),
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onclick: () => router.push("/admin/rooms"),
      isActive: pathname.includes("/admin/rooms"),
    },{
      name: "Users",
      icon: <User2 size={iconSize} />,
      onclick: () => router.push("/admin/users"),
      isActive: pathname.includes("/admin/users"),
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onclick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
  ];

  const menuItemsToShow: any[] = loggedInUserData.isAdmin
    ? adminMenuItems
    : userMenuItems;

  return (
    <Drawer open={showSidebar} onClose={() => setShowSidebar(false)} closable>
      <div className="flex flex-col gap-8 ">
        {menuItemsToShow.map((item, index) => (
          <div
            className={`flex gap-4 items-center text-gray-700  cursor-pointer hover:text-teal-500 px-10 py-3 rounded  ${
              item.isActive ? "bg-gray-700 text-white" : ""
            } `}
            key={index}
            onClick={() => {
              item.onclick();
              setShowSidebar(false);
            }}
          >
            {item.icon}
            <span className="mt-[2px]">{item.name}</span>
          </div>
        ))}

        <span
          className="text-center cursor-pointer text-red-500"
          onClick={onLogout}
        >
          Logout
        </span>
      </div>
    </Drawer>
  );
}

export default Sidebar;
