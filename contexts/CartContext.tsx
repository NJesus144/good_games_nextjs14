"use client";

import { Games } from "@/types";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export interface CustomerData {
  fullName: string

  mobile: string
  document: string
 
  creditCardNumber: string

  creditCardExpiration: string
  creditCardSecurityCode: string
}

// export interface Game extends NewGamesDetails {
//   quantity: number;
//   subtotal: number;
// }

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
  cart: Games[];
  addGameIntoCart: (game: Games) => void;
  removeGameFromCart: (game: Games) => void;
  // updateCart: ({id, game, newQuantity}: UpdateCartProps) => void;
  payOrder: (customer: CustomerData) => void;
  confirmOrder: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

const localStorageKey = "@gameStore:cart";

export function CartProvider({ children }: CartProviderProps) {
  const router = useRouter();
  const [cart, setCart] = useState<Games[]>(() => {
    const value = localStorage.getItem(localStorageKey);

    if (value) return JSON.parse(value);
    return [];
  });

  function saveCart(item: Games[]) {
    setCart(item);

    localStorage.setItem(localStorageKey, JSON.stringify(item));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem(localStorageKey);
  }

  function addGameIntoCart(game: Games): void {
    const newGame = { ...game, quantity: 1, subtotal: game.price };
    const newCart = [...cart, newGame];

    toast.success(`${game.name} Added to cart😎`);

    saveCart(newCart);
  }

  function removeGameFromCart(game: Games): void {
    const newCart = cart.filter((item) => item.id !== game.id);
    toast.error(`${game.name} removed from cart😢`);
    saveCart(newCart);
  }

  function confirmOrder() {
    router.push("/payment");
  }


  function payOrder(customer: CustomerData) {
    console.log("payorder", cart, customer);
    // chamada para o back
   

    clearCart() // deve ser executado após retorno positivo da API
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
