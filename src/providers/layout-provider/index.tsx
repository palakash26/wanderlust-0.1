"use client";

import React from "react";
import Header from "./header";
import Footer from "./footer";
import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { usePathname } from "next/navigation";
import Spinner from "@/components/spinner";
import { motion } from "framer-motion";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUserData, setLoggedInUserData] = React.useState<UserType | null>(null);

  const pathname = usePathname();
  const isAuthRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");

  const isAdminRoute = pathname.includes("/admin");
  const isSubAdminRoute = pathname.includes("/subadmin");

  const [loading, setLoading] = React.useState<boolean>(true);

  const getUserData = async () => {
    try {
      if (!loggedInUserData) {
        setLoading(true);
      }
      const response = await GetCurrentUserFromMongoDB();
      if (response.success && response.data) {
        setLoggedInUserData(response.data);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("tripora_user", JSON.stringify(response.data));
        }
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem("tripora_user");

      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setLoggedInUserData(parsed);
          setLoading(false);
        } catch (e) {
          // ignore cache parse error
        }
      }
    }

    if (!isAuthRoute) {
      getUserData();
    }
  }, [pathname]);

  if (isAuthRoute) {
    return children;
  }

  // Restrict access to admin routes for non-admin users
  if (loggedInUserData && isAdminRoute && !loggedInUserData.isAdmin) {
    return (
      <AccessDenied message=" You are not authorized to access this page." />
    );
  }

  // Restrict access to sub-admin routes for regular users
  if (
    loggedInUserData &&
    isSubAdminRoute &&
    !loggedInUserData.isAdmin &&
    !loggedInUserData.isSubAdmin
  ) {
    return (
      <AccessDenied message=" You are not authorized to access this page." />
    );
  }

  // Only block render on admin/subadmin routes while waiting for user data validation
  if (loading && (isAdminRoute || isSubAdminRoute) && !loggedInUserData) {
    return <Spinner fullHeight />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        {/* Header section */}
        <Header loggedInUserData={loggedInUserData} />

        {/* Main content section with comfortable padding */}
        <main className="flex-grow px-4 sm:px-6 md:px-10 lg:px-12 xl:px-15">
          {children}
        </main>

      </div>

      {/* Real-time Footer */}
      <Footer />
    </div>
  );
}



export default LayoutProvider;

const AccessDenied = ({ message }: { message: string }) => (
  <div className="h-[500px] flex flex-col items-center justify-center">
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
        {message}
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
);
