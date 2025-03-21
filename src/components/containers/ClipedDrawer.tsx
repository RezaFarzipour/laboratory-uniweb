"use client";

import AppBar from "@/components/element/clipedDrawer/AppBar";
import SidebarHeader from "@/components/element/clipedDrawer/SidebarHeader";
import SidebarLinks from "@/components/element/clipedDrawer/SidebarLinks";
import { SidebarLink } from "@/types";
import React, { useState } from "react";

interface ClipedDrawerProps {
  children: React.ReactNode;
  sideBarData: SidebarLink[];
}

const ClipedDrawer = ({ children, sideBarData }: ClipedDrawerProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeItemId, setActiveItemId] = useState<number>();

  return (
    <div className="flex h-screen  ">
      {/* Sidebar - Hidden on mobile */}
      <aside
        className={`

          fixed md:relative bg-[#ffffff] 
          flex flex-col items-center h-full py-8 px-4 w-[280px] 
          z-50 transition-all duration-300
          ${isSidebarOpen ? "right-0" : "-right-[300px]"} 
          md:right-0 md:left-0
        `}
      >
        <SidebarHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-col justify-between h-full w-full">
          <SidebarLinks
            sidebarlinks={sideBarData}
            activeItemId={activeItemId}
            setActiveItemId={setActiveItemId}
          />

          <div>
            <p>نام کاربر</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex flex-col w-full">
        <AppBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="p-4 flex-grow bg-gray-100">{children}</div>
      </main>
    </div>
  );
};

export default ClipedDrawer;
