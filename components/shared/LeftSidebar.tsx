"use client";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

import React from "react";
import Link from "next/link";
import SelectFilter from "./SelectFilter";
import { GenresFilters } from "@/constants/filters";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className=" fixed z-50 h-screen  overflow-y-auto bg-[rgb(32,32,36)] px-4 pt-10 text-white max-sm:hidden xl:w-[266px]">
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
                isActive ? "primary-gradient rounded-lg text-white" : " "
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Icon />
              <p
                className={`${
                  isActive ? "font-bold" : "font-medium"
                } max-xl:hidden`}
              >
                {item.label}
              </p>
            </Link>
          </div>
        );
      })}
      <div className="mt-6 flex flex-col gap-4">
        <SelectFilter filters={GenresFilters} />
        <SelectFilter filters={GenresFilters} />
        <SelectFilter filters={GenresFilters} />
        <SelectFilter filters={GenresFilters} />
      </div>
    </section>
  );
};

export default LeftSidebar;
