"use client";

import React from "react";
import Header from "./header";
import { UserType } from "@/interfaces";
import { message } from "antd";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { usePathname } from "next/navigation";
import Spinner from "@/components/spinner";
import { motion } from "framer-motion";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUserData, setLoggedInUserData] =
    React.useState<UserType | null>(null);

  const pathname = usePathname();
  const isAuthRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");

  const isAdminRoute = pathname.includes("/admin");

  const [loading, setLoading] = React.useState(true);
  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await GetCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedInUserData(response.data);
        // console.log(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!loggedInUserData && !isAuthRoute) {
      getUserData();
    }
  }, []);

  if (isAuthRoute) {
    return children;
  }

  // if (loggedInUserData && isAdminRoute && !loggedInUserData.isAdmin) {
  //   return (
  //     <div className="">
  //       <Header loggedInUserData={loggedInUserData} />
  //       <span className="text-center text-gray-500 mt-20 px-5 lg:px-20 ">
  //         You are not authorized to access this page.
  //       </span>
  //     </div>
  //   );
  // }

  

  if (loggedInUserData && isAdminRoute && !loggedInUserData.isAdmin) {
    return (
      <div>
        <Header loggedInUserData={loggedInUserData} />
        <div className="h-[500px] flex flex-col items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mt-5 px-5 lg:px-20"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-2xl lg:text-4xl font-bold text-gray-800 mb-5"
          >
            🚫 Access Denied 🚫
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-500"
          >
            You are not authorized to access this page.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.8,
          }}
          className="mt-10"
        >
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-100 transition"
          >
            Go Back
          </button>
        </motion.div>
      </div>
      </div>
      
    );
  }
  

  if (loading) {
    return <Spinner fullHeight />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header section */}
      <Header loggedInUserData={loggedInUserData} />

      {/* Main content section with comfortable padding */}
      <main className="flex-grow px-4 sm:px-6 md:px-10 lg:px-12 xl:px-15 mt-8">
        {children}
      </main>
    </div>
  );
}

export default LayoutProvider;
