import { SidebarLink } from "@/types";
import { HomeIcon, ScrollText, Swords } from "lucide-react";

export const sidebarLinks: SidebarLink[] = [
  {
    icon: HomeIcon,
    route: "/",
    label: "Home",
  },
  {
    icon: Swords,
    route: "/library",
    label: "Library",
  },
  {
    icon: ScrollText,
    route: "/wishlist",
    label: "Wishlist",
  },
];
