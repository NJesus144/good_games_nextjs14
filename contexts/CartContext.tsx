"use client";

import {
  createGameCart,
  getGamesFromCart,
  removeGameFromCart,
} from "@/lib/actions/game.actions";

import { Games } from "@/types";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";


interface CartContextProps {
  cart: Games[];
  addGameIntoCart: (mappedGame: Games, userId?: string) => void;
  removeGame: (game: Games) => void;
  // updateCart: ({id, game, newQuantity}: UpdateCartProps) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);



export function CartProvider({ children }: CartProviderProps) {

  const [cart, setCart] = useState<Games[]>([]);



  const getGames = async () => {
    const getGamesInCart = await getGamesFromCart();
    getGamesInCart && setCart(getGamesInCart);
  };

  useEffect(() => {
    getGames();
  }, []);

  async function addGameIntoCart(mappedGame: Games, userId?: string) {
 
    const newGame = { ...mappedGame, quantity: 1, subtotal: mappedGame.price };


    toast.success(`${mappedGame.name} Added to cart😎`);

    try {
      await createGameCart({
        game: newGame,
        userId,
        path: "/",
      });

      await getGames();
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

    await getGames();
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
