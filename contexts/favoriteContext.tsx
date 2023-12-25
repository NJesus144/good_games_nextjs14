"use client";
import { GamesWithPrice } from "@/types";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface FavoriteContextProps {
  favorites: GamesWithPrice[];
  setFavorites: React.Dispatch<React.SetStateAction<GamesWithPrice[]>>;
  addToWishlist: (game: GamesWithPrice) => void;
  removeFromWishlist: (game: GamesWithPrice) => void;
  isFavorite: (game: GamesWithPrice) => boolean;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext({} as FavoriteContextProps);

export function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<GamesWithPrice[]>(() => {
    const storagedFavorites = localStorage.getItem("@gameStore:favorites");

    if (storagedFavorites) return JSON.parse(storagedFavorites);
    return [];
     
  });

  useEffect(() => {
    localStorage.setItem("@gameStore:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToWishlist = (game: GamesWithPrice) => {
    setFavorites([...favorites, game]);
  };

  const removeFromWishlist = (game: GamesWithPrice) => {
    console.log('game', game)
    setFavorites(favorites.filter((item) => item.id !== game.id));
  };

  const isFavorite = (game: GamesWithPrice) =>
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
