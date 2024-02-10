"use client";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SelectFilter from "./SelectFilter";
import { GenresFilters, PlatformFilters } from "@/constants/filters";
import { getGamesFromCart } from "@/lib/actions/gameCart.actions";

const LeftSidebar = ({ userId }: { userId: string }) => {
  const [quantity, setQuantity] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const getQuantityCart = async () => {
      const response = await getGamesFromCart(userId);
      setQuantity(response.length);
    };

    getQuantityCart();
  });

  return (
    <section className=" fixed z-50 h-screen  overflow-y-auto border-r-1 border-[#202020] bg-[#151515] px-4 pt-10 text-white max-sm:hidden xl:w-[266px]">
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
                } relative max-xl:hidden`}
              >
                {item.label}
              </p>
            </Link>
          </div>
        );
      })}
      {quantity > 0 && (
        <span className="absolute left-[2.7rem] top-[13.2rem] flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-base">
          {quantity}
        </span>
      )}
      <div className="mt-6 flex flex-col gap-4">
        <SelectFilter
          value="RPG"
          label="Select a genre"
          filters={GenresFilters}
        />
        <SelectFilter
          value="PC"
          label="Select a platform"
          filters={PlatformFilters}
        />
      </div>
    </section>
  );
};

export default LeftSidebar;
