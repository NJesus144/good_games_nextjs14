import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Games } from "@/types";
import { FavoriteContext } from "@/contexts/FavoriteContext";
import { CartContext } from "@/contexts/CartContext";

export interface WishListButton {
  wishlist?: boolean;
}

export interface CartButton {
  cart?: boolean;
}

interface RemoveGameFromListProps {
  select: CartButton | WishListButton;
  game: Games;
}

const RemoveGameFromList = ({ select, game }: RemoveGameFromListProps) => {
  const { removeFromWishlist } = useContext(FavoriteContext);
  const { removeGameFromCart } = useContext(CartContext);

  const handleRemove = () => {
    if ("cart" in select) {
      removeGameFromCart(game);
    } else if ("wishlist" in select) {
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
  );
};

export default RemoveGameFromList;
