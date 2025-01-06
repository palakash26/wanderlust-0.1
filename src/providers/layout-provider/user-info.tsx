import { UserType } from "@/interfaces";
import { CircleUser } from "lucide-react";

import React from "react";
import Sidebar from "./sidebar";

function UserInfo({ loggedInUserData }: { loggedInUserData: UserType }) {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const displayName = loggedInUserData.name ? loggedInUserData.name : "null";
  return (
    <div className="p-3 lg:border-l flex items-center gap-1 ">
      <span className="text-gray-500 text-sm hover:text-teal-700">
        {displayName}
      </span>
      <CircleUser
        className=" text-gray-500 hover:text-teal-700"
        onClick={() => setShowSidebar(!showSidebar)}
      />

      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          loggedInUserData={loggedInUserData}
        />
      )}
    </div>
  );
}
export default UserInfo;
