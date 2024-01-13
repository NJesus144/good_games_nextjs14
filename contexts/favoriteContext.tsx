"use client";
import { generateAndSetRandomPrice } from "@/lib/utils";
import React, { createContext, useState, ReactNode, useEffect } from "react";
// import { Game } from "./CartContext";
import { Games } from "@/types";

interface FavoriteContextProps {
  favorites: Games[];
  setFavorites: React.Dispatch<React.SetStateAction<Games[]>>;
  addToWishlist: (game: Games) => void;
  removeFromWishlist: (game: Games) => void;
  isFavorite: (game: Games) => boolean;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext({} as FavoriteContextProps);

// export const CartContext = createContext({} as CartContextProps);


export function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<Games[]>(() => {
    const storagedFavorites = localStorage.getItem("@gameStore:favorites");

    if (storagedFavorites) return JSON.parse(storagedFavorites);
    return [];
  });

  useEffect(() => {
    localStorage.setItem("@gameStore:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToWishlist = (game: Games) => {
    const gamesPrice = {
      ...game,
      price: generateAndSetRandomPrice(game.id),
    };

    setFavorites([...favorites, gamesPrice]);
  };

  const removeFromWishlist = (game: Games) => {
    setFavorites(favorites.filter((item) => item.id !== game.id));
  };

  const isFavorite = (game: Games) =>
    favorites.some((item) => item.id === game.id);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        setFavorites,
        addToWishlist,
        removeFromWishlist,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
