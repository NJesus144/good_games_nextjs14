"use client";
import React from "react";
import UserCredentials from "./UserCredentials";
import Searchbar from "../Searchbar";
import { Navbar } from "@nextui-org/react";

import { SheetMenu } from "../Sheet";

const NavDetails = () => {
  return (
    <header>
      <nav className="flex items-center justify-around p-6">
        <SheetMenu />
        <Searchbar />
        <Navbar className="w-fit bg-transparent">
          <UserCredentials />
        </Navbar>
      </nav>
    </header>
  );
};

export default NavDetails;
