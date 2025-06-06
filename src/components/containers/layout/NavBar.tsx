"use client";

import React, { useEffect } from "react";
import { Navbar } from "@heroui/react";
import { NavBarRight } from "@/components/module/navBar/NavBarRight";
import { NavBarLeft } from "@/components/module/navBar/NavBarLeft";
import MobileMenu from "@/components/module/navBar/MobileMenu";
import { useGetUser } from "@/hooks/useAuth";
import { useUserStore } from "@/store/useUserdata";

const navbarStyles = {
  base: "z-10 shadow-md bg-inherit mb-0 transition-all duration-200 border-b border-b-secondary-300",
  loading: (isLoading: boolean) =>
    isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0",
};

const NavBar = () => {
  const setUser = useUserStore((state) => state.setUser);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data:user, isPending } = useGetUser();

  useEffect(() => {
    setUser(user || null);
  }, [user]);

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className={` ${navbarStyles.base} ${navbarStyles.loading(
        isPending
      )} bg-white/50`}
    >
      <NavBarRight isMenuOpen={isMenuOpen} />
      <NavBarLeft  />
      <MobileMenu />
    </Navbar>
  );
};

export default NavBar;
