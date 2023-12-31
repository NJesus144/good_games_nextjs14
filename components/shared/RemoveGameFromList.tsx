import { useCart } from "@/providers/useCart";
import { useFavorite } from "@/providers/useFavorite";

import { Trash2 } from "lucide-react";
import React from "react";
import { Game } from "@/contexts/CartContext";

export interface WishListButton {
  wishlist?: boolean;
}

export interface CartButton {
  cart?: boolean;
}


interface RemoveGameFromListProps {
 select: CartButton | WishListButton;
  game: Game;
}

const RemoveGameFromList = ({
 select,
  game,
}: RemoveGameFromListProps) => {
  const { removeFromWishlist } = useFavorite();
  const { removeGameFromCart } = useCart();

  const handleRemove = () => {
    if ('cart' in select) {
      removeGameFromCart(game);
    } else if ('wishlist' in select) {
      removeFromWishlist(game);
    }
  };

  return (
    <button
    className="flex cursor-pointer items-center gap-1 text-sm duration-200 ease-linear hover:text-[#696969] hover:underline"
    onClick={handleRemove}
  >
    Remove <Trash2 size={16} />
  </button>
  )
};

export default RemoveGameFromList;
