"use client";

import { GamesWithPrice, NewGamesDetails } from "@/types";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CustomerData } from "@/types/CustomerData";

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
  payOrder: (customer: CustomerData) => void;
  confirmOrder: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const router = useRouter();

  const [cart, setCart] = useState<Game[]>(() => {
    const value = localStorage.getItem("@gameStore:cart");

    if (value) return JSON.parse(value);
    return [];
  });

  function addGameIntoCart(game: GamesWithPrice): void {
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

  function confirmOrder() {
    router.push("/payment");
  }

  function payOrder(customer: CustomerData) {
    console.log('payorder', cart, customer)
// chamada para o back

  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addGameIntoCart,
        removeGameFromCart,
        confirmOrder,
        payOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
