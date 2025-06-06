"use client";

import Link from "next/link";
import SideBarNavs from "./SideBarNavs";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { FC } from "react";
import Logo from "@/components/element/Logo";
import { NavLinkItem, User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/store/useToastSlice";
import { useRouter } from "next/navigation";
import { logOut } from "@/services/api/auth";

type SideBarProps = {
  onClose?: () => void;
  navLinkData?: NavLinkItem[];
  user?: User;
  path: string;
};

const SideBar: FC<SideBarProps> = ({ onClose, navLinkData, user, path }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: asyncLogOut } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      showToast("با موفقیت خارج شدید", "success");
      queryClient.removeQueries({ queryKey: ["get-user"] });
      router.replace("/");
    },
    onError: () => {
      showToast("خروج با خطا مواجه شد", "error");
    },
  });

  const logoutHandler = async () => {
    await asyncLogOut();
  };
  return (
    <div className="overflow-y-auto flex flex-col p-5 h-screen pt-10 lg:pt-8">
      {/* Drawer Header */}
      <div className="flex items-center justify-between w-full mb-5 pb-2 border-b border-b-secondary-200">
        <Link
          href="/"
          className="flex items-center gap-x-4 justify-center text-secondary-700 lg:flex-1"
        >
          <h3>
            <Logo />
          </h3>
        </Link>
      </div>

      {/* Drawer Content */}
      <div className="overflow-y-auto flex-auto">
        <SideBarNavs onClose={onClose} navLinkData={navLinkData} />

        <div
          onClick={logoutHandler}
          className="flex items-center gap-x-2 rounded-2xl transition-all duration-200 text-secondary-800 py-3 px-4 hover:text-red-400 cursor-pointer"
        >
          <HiOutlineArrowLeftStartOnRectangle className="ml-4 h-5 w-5" />
          <span className="text-lg">خروج</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 justify-around mt-5">
        <p className="text-secondary-800 text-sm font-bold">
          {user ? user.first_name + " " + user.last_name : "نام و نام خانوادگی"}
        </p>
        <Link href={path}>
          <div className="p-2 rounded-full border border-[#ddd] cursor-pointer">
            {" "}
            <CiEdit size={17} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
