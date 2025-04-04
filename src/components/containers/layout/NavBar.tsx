"use client";

import React, { useEffect } from "react";
import { Navbar } from "@heroui/react";
import { NavBarRight } from "@/components/element/navBar/NavBarRight";
import { NavBarLeft } from "@/components/element/navBar/NavBarLeft";
import MobileMenu from "@/components/element/navBar/MobileMenu";

const navbarStyles = {
  base: "z-10 shadow-md bg-inherit mb-10 transition-all duration-200 border-b border-b-secondary-300",
  loading: (isLoading: boolean) =>
    isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0",
};

const NavBar = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
      setIsLoading(false)
    );
  }, []);

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className={`${navbarStyles.base} ${navbarStyles.loading(
        isLoading
      )} bg-white/50`}
    >
      <NavBarRight isMenuOpen={isMenuOpen} />
      <NavBarLeft />
      <MobileMenu />
    </Navbar>
  );
};

export default NavBar;
