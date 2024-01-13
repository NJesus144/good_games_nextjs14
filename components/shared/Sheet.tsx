"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";

export function SheetMenu() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-0 bg-transparent text-white  hover:bg-gray-400"
        >
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#202024] pt-12">
        <SheetHeader>
          <SheetDescription>
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
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
