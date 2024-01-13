"use client";

import { Game} from "@/types";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CustomerData } from "@/types/CustomerData";


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
  cart: Game[];
  addGameIntoCart: (game: Game) => void;
  removeGameFromCart: (game: Game) => void;
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
  const [cart, setCart] = useState<Game[]>(() => {
    const value = localStorage.getItem(localStorageKey);

    if (value) return JSON.parse(value);
    return [];
  });

  function saveCart(item: Game[]) {
    setCart(item);

    localStorage.setItem(localStorageKey, JSON.stringify(item));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem(localStorageKey);
  }

  function addGameIntoCart(game: Game): void {
    const newGame = { ...game, quantity: 1, subtotal: game.price };
    const newCart = [...cart, newGame];

    toast.success(`${game.name} Added to cart😎`);

    saveCart(newCart);
  }

  function removeGameFromCart(game: Game): void {
    const newCart = cart.filter((item) => item.id !== game.id);
    toast.error(`${game.name} removed from cart😢`);
    saveCart(newCart);
  }

  function confirmOrder() {
    router.push("/payment");
  }

//   const obj = {
//   "cart": [
//     {
//       "quantity": 2,
//       "subtotal": 99.98,
//       "id": 456,
//       "name": "Super Adventure",
//       "description": "Embark on a thrilling quest to save the kingdom.",
//       "metacritic": 92,
//       "released": "2022-11-30T00:00:00.000Z",
//       "background_image": "https://example.com/super-adventure.jpg",
//       "developers": [
//         {"id": 3, "name": "Quest Makers"}
//       ],
//       "platforms": [
//         {"id": 1, "name": "PC"},
//         {"id": 3, "name": "Xbox Series X"}
//       ],
//       "genres": [
//         {"id": 1, "name": "Action"},
//         {"id": 2, "name": "Adventure"}
//       ],
//       "price": 49.99,
//       "slug": "super-adventure",
//       "rating": 4.5
//     },
//     {
//       "quantity": 1,
//       "subtotal": 29.99,
//       "id": 789,
//       "name": "Space Explorer",
//       "description": "Conquer the galaxy in this space exploration game.",
//       "metacritic": 88,
//       "released": "2023-05-18T00:00:00.000Z",
//       "background_image": "https://example.com/space-explorer.jpg",
//       "developers": [
//         {"id": 4, "name": "Galactic Creations"}
//       ],
//       "platforms": [
//         {"id": 1, "name": "PC"},
//         {"id": 4, "name": "Nintendo Switch"}
//       ],
//       "genres": [
//         {"id": 2, "name": "Sci-Fi"},
//         {"id": 3, "name": "Simulation"}
//       ],
//       "price": 29.99,
//       "slug": "space-explorer",
//       "rating": 4.2
//     }
//   ],
//   "customer": {
//     "fullName": "John Doe",
//     "mobile": "1234567890",
//     "document": "ABC123456",
//     "creditCardNumber": "**** **** **** 1234",
//     "creditCardExpiration": "12/25",
//     "creditCardSecurityCode": "123"
//   },
//   "payment": {
//     "creditCardNumber": "**** **** **** 1234",
//     "creditCardExpiration": "12/25",
//     "creditCardSecurityCode": "123"
//   }
// }

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
