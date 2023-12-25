import { useContext } from "react";

import { FavoriteContext } from "@/contexts/FavoriteContext";

export function useFavorite() {
  return useContext(FavoriteContext);
}
