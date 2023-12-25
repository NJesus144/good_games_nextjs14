"use client";

import { GamesWithPrice } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Game extends GamesWithPrice {
  quantity: number;
  subtotal: number;
}

interface RemoveGameFromCartProps {
  id: number;
  game: string;
}

interface UpdateCartProps {
  id: number;
  game: string;
  newQuantity: number;
}

interface CartContextProps {
  cart: Game[];
  addGameIntoCart: (game: GamesWithPrice) => void;
  // removeGameFromCart: ({id, game}: RemoveGameFromCartProps) => void;
  // updateCart: ({id, game, newQuantity}: UpdateCartProps) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Game[]>([]);

  function addGameIntoCart(game: GamesWithPrice): void {
    // buscar
    const gameExists = cart.find(
      (item) => item.id === game.id && item.name === game.name
    );

    //Atualizar

    if (gameExists) {
      const newCart = cart.map((item) => {
        if (item.id === game.id) {
          const quantity = item.quantity + 1;
          const subtotal = item.price * quantity;

          return { ...item, quantity, subtotal };
        }
        return item;
      });
      console.log("newCart atualizaocao", newCart);
      setCart(newCart);
      return;
    }

    const newGame = { ...game, quantity: 1, subtotal: game.price };
    const newCart = [...cart, newGame];

    console.log("newCart adicao", newCart);
    setCart(newCart);
  }

  return (
    <CartContext.Provider value={{ cart, addGameIntoCart }}>
      {children}
    </CartContext.Provider>
  );
}
