import { SidebarLink } from "@/types";
import { HomeIcon, ScrollText, ShoppingCart, Swords } from "lucide-react";

export const sidebarLinks: SidebarLink[] = [
  {
    icon: HomeIcon,
    route: "/",
    label: "Home",
  },
  {
    icon: Swords,
    route: "/my-library",
    label: "Library",
  },
  {
    icon: ScrollText,
    route: "/wishlist",
    label: "Wishlist",
  },
  {
    icon: ShoppingCart,
    route: "/cart",
    label: "Cart",
  },
];
