import { useContext } from "react";

import { FavoriteContext } from "@/contexts/favoriteContext";

export function useFavorite() {
  return useContext(FavoriteContext);
}
