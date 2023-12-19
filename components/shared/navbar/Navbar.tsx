"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { HomeIcon, ScrollText, Swords } from "lucide-react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-[rgb(32,32,36)] ">
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
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-[rgb(32,32,36)]">
        <NavbarMenuItem className="flex flex-col gap-10 p-6 ">
          <Link className="flex w-full gap-2" href="#" size="lg">
            <HomeIcon size={24} color="white" />{" "}
            <p className="text-white">Home</p>
          </Link>
          <Link className="flex w-full gap-2" href="#" size="lg">
            <Swords size={24} color="white" />{" "}
            <p className="text-white">Library</p>
          </Link>
          <Link className="flex w-full gap-2" href="#" size="lg">
            <ScrollText size={24} color="white" />{" "}
            <p className="text-white">Wishlist</p>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
