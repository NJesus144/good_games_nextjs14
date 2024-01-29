"use client";
import { generateAndSetRandomPrice } from "@/lib/utils";
import React, { createContext, useState, ReactNode, useEffect } from "react";
// import { Game } from "./CartContext";
import { Games } from "@/types";
import {
  addGameWishlist,
  getGamesFromWishlist,
  removeGameFromWishlist,
} from "@/lib/actions/wishlist.actions";

interface FavoriteContextProps {
  favorites: Games[];
  addToWishlist: (game: Games, userId?: string) => void;
  removeFromWishlist: (game: Games) => void;
  isFavorite: (game: Games) => boolean;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext({} as FavoriteContextProps);

export function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<Games[]>([]);

  const getGames = async () => {
    const getGamesInWishlist = await getGamesFromWishlist();
    getGamesInWishlist && setFavorites(getGamesInWishlist);
  };

  useEffect(() => {
    getGames();
  }, []);

  const addToWishlist = async (game: Games, userId?: string) => {
    const gamesPrice = {
      ...game,
      price: generateAndSetRandomPrice(game.id),
    };

    const wishlistGames = await addGameWishlist({
      game: gamesPrice,
      userId,
      path: "/wishlist",
    });

    setFavorites([...favorites, wishlistGames]);
  };

  const removeFromWishlist = async (game: Games) => {
   
    await removeGameFromWishlist({
      gameId: game._id,
      path: "/wishlist",
    });

    await getGames();
  };

  const isFavorite = (game: Games) =>
    favorites.some((item) => item.id === game.id);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToWishlist,
        removeFromWishlist,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
