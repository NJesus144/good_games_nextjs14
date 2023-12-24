"use client";
import { GamesWithPrice } from "@/types";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface FavoriteContextProps {
  favorites: GamesWithPrice[];
  setFavorites: React.Dispatch<React.SetStateAction<GamesWithPrice[]>>;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext({} as FavoriteContextProps);

export function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<GamesWithPrice[]>(() => {
    const storagedFavorites = localStorage.getItem("@gameStore:favorites");

    if (storagedFavorites) {
      return JSON.parse(storagedFavorites);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("@gameStore:favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}
