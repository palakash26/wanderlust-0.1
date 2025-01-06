import { UserType } from "@/interfaces";
import React from "react";
import ProjectTitle from "./project-title";
import { Button } from "antd";
import UserInfo from "./user-info";
import Link from "next/link";

function Header({ loggedInUserData }: { loggedInUserData: UserType | null }) {
  if (!loggedInUserData) {
    return (
      <div className="flex justify-center items-center">
        <ProjectTitle />
        <Link href="/sign-in">
          <Button type="link">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-15">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center border-b border-teal-700 border-solid py-4 gap-4 sm:gap-0">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <ProjectTitle />
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <UserInfo loggedInUserData={loggedInUserData} />
        </div>
      </div>
    </div>
  );
}

export default Header;
