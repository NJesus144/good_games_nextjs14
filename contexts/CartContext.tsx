"use client";
import {
  createGameCart,
  // getGamesFromCart,
  removeGameFromCart,
} from "@/lib/actions/gameCart.actions";

import { Games } from "@/types";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

interface CartContextProps {
  cart: Games[];
  addGameIntoCart: (mappedGame: Games, userId: string) => void;
  removeGame: (game: Games) => void;

}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
   const [cart] = useState<Games[]>([]);


  async function addGameIntoCart(mappedGame: Games, userId: string) {
    const newGame = { ...mappedGame, quantity: 1, subtotal: mappedGame.price };

    try {
      await createGameCart({
        game: newGame,
        userId,
        path: "/",
      });

      toast.success(`${mappedGame.name} Added to cart😎`);
      
    } catch (error) {
      console.log(error);
    }
  }

  async function removeGame(game: Games) {
    await removeGameFromCart({
      gameId: game._id,
      path: "/cart",
    });

    toast.error(`${game.name} removed from cart😢`);

    // await getGames(game._id);
    // saveCart(newCart);
  }

  // function confirmOrder() {
  //   router.push("/payment");
  // }

  // function payOrder(customer: CustomerData) {
  //   console.log("payorder", cart, customer);
  //   // chamada para o back

  //   clearCart() // deve ser executado após retorno positivo da API
  // }

  return (
    <CartContext.Provider
      value={{
        cart,
        addGameIntoCart,
        removeGame,
        // getGamesFromCartByUserId
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
