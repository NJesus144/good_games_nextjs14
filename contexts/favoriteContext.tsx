"use client";
import { generateAndSetRandomPrice } from "@/lib/utils";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Game } from "./CartContext";

interface FavoriteContextProps {
  favorites: Game[];
  setFavorites: React.Dispatch<React.SetStateAction<Game[]>>;
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (game: Game) => void;
  isFavorite: (game: Game) => boolean;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext({} as FavoriteContextProps);

export function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<Game[]>(() => {
    const storagedFavorites = localStorage.getItem("@gameStore:favorites");

    if (storagedFavorites) return JSON.parse(storagedFavorites);
    return [];
  });

  useEffect(() => {
    localStorage.setItem("@gameStore:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToWishlist = (game: Game) => {
    const gamesPrice = {
      ...game,
      price: generateAndSetRandomPrice(game.id),
    };

    setFavorites([...favorites, gamesPrice]);
  };

  const removeFromWishlist = (game: Game) => {
    setFavorites(favorites.filter((item) => item.id !== game.id));
  };

  const isFavorite = (game: Game) =>
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
