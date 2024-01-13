'use client'
import React from 'react'
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from 'next/link';

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="mt-10">
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
      
    </section>
  );
};
export default NavContent