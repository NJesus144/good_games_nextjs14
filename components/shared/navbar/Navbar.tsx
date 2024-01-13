"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NavContent from "../NavContent";
import UserCredentials from "./UserCredentials";
import Searchbar from "../Searchbar";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-[#202024] p-6 ">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white sm:hidden"
          />
          <NavbarBrand>
            <div className="flex">
              <Link href="/">
                <p className=" text-2xl font-bold text-white">GG</p>
                <span className=" text-2xl font-bold text-blue-500">Easy</span>
              </Link>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <Searchbar />
        </NavbarContent>
        <UserCredentials />
        <NavbarMenu className="bg-[rgb(32,32,36)]">
          <NavbarMenuItem className="flex flex-col gap-10 p-6 ">
            <NavContent />
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}
