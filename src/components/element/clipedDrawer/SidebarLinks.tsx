import { sidebarlinks } from "@/constants/data";
import React from "react";

interface SidebarLinksProps {
  activeItemId: number | undefined;
  setActiveItemId: (id: number) => void;
}

const SidebarLinks = ({ activeItemId, setActiveItemId }: SidebarLinksProps) => {
  return (
    <div className="w-full bg-[#ffffff]">
      {sidebarlinks.map((link, index) => (
        <div className="border-r-9" key={link.id}>
          <button
            onClick={() => setActiveItemId(link.id)}
            className={`
              flex justify-start w-full gap-3 py-4 px-2 rounded-md 
              cursor-pointer transition-all duration-300 
              hover:${link.hover}
              ${index === activeItemId ? "bg-default-200 font-bold" : ""}
            `}
          >
            <span className="text-xl">
              <link.icon />
            </span>
            <p
              className={`text-xl text-default-500 transition-all duration-300 hover:${link.hover}`}
            >
              {link.title}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SidebarLinks;
