"use client";

import { GamesWithPrice, NewGamesDetails } from "@/types";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

export interface Game extends NewGamesDetails {
  quantity: number;
  subtotal: number;
}

// interface RemoveGameFromCartProps {
//   id: number;
//   game: string;
// }

// interface UpdateCartProps {
//   id: number;
//   game: string;
//   newQuantity: number;
// }

interface CartContextProps {
  cart: Game[];
  addGameIntoCart: (game: GamesWithPrice) => void;
  removeGameFromCart: (game: Game) => void;
  // updateCart: ({id, game, newQuantity}: UpdateCartProps) => void;

  // confirmOrder: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Game[]>(() => {
    const value = localStorage.getItem("@gameStore:cart");

    if (value) return JSON.parse(value);
    return [];
  });

  function addGameIntoCart(game: GamesWithPrice): void {
    // buscar
    //  const gameExists = cart.find(
    //    (item) => item.quantity === game.id && item.name === game.name
    //  );
    // const existingGame = cart.find((item) => item.id === game.id);
    // const newQuantity = cart.reduce((sumQuantity, game) => {
    //   return sumQuantity + game.quantity;
    // }, 0);

    // Atualizar

    // if (gameExists) {
    //   const newCart = cart.map((item) => {
    //     if (item.id === game.id) {
    //       const quantity = item.quantity + 1;
    //       const subtotal = item.price * quantity;

    //       return { ...item, quantity, subtotal };
    //     }
    //     return item;
    //   });

    //   toast.success(`${game.name} Added to cart`);
    //   setCart(newCart);
    //   // return;
    // }

    // const newGame = { ...game, quantity: 1, subtotal: game.price };
    const newGame = { ...game, quantity: 1, subtotal: game.price };
    const newCart = [...cart, newGame];

    toast.success(`${game.name} Added to cart😎`);

    
    setCart(newCart);
    
    localStorage.setItem("@gameStore:cart", JSON.stringify(newCart));
  }



  function removeGameFromCart(game: Game): void {
    const newCart = cart.filter((item) => item.id !== game.id);
    toast.error(`${game.name} removed from cart😢`);
    localStorage.setItem("@gameStore:cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  return (
    <CartContext.Provider value={{ cart, addGameIntoCart, removeGameFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
