"use client";
import React from "react";
import { usePathname } from "next/navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { sidebarLinks } from "@/constants";

import UserCredentials from "./UserCredentials";
import SelectFilter from "../SelectFilter";
import { GenresFilters } from "@/constants/filters";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        const Icon = item.icon;

        return (
          <div key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive ? " rounded-lg " : "text-white"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Icon />
              <p className={`${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </p>
            </Link>
          </div>
        );
      })}
      <SelectFilter
        filters={GenresFilters}
        otherClasses="max-sm:block mt-4"
      />
    </section>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-[#151515] p-6 ">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white sm:hidden"
        />
        <NavbarBrand>
          <div className="flex">
            <p className=" text-lg font-bold text-white">GG</p>
            <span className=" text-lg font-bold text-blue-500">Easy</span>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <input type="text" />
        </NavbarItem>
      </NavbarContent>
      <UserCredentials />
      <NavbarMenu className="bg-[rgb(32,32,36)]">
        <NavbarMenuItem className="flex flex-col gap-10 p-6 ">
          <NavContent />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
