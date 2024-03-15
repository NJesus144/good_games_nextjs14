"use client";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { checkoutOrder } from "@/lib/actions/order.actions";
import { IProduct } from "@/lib/database/models/product.model";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ games, userId }: { games: IProduct[]; userId: string }) => {

  
  

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
   
    const orders = games.map((game: IProduct) => {
      return {
        productName: game.name,
        productId: game._id,
        price: Math.round(game.price),
        buyerId: userId,
      };
    });

   

   await checkoutOrder(orders, userId);

  };

  return (
    <form action={onCheckout} method="post">
      <button
        type="submit"
        role="link"
        className="w-full rounded-md bg-green-500 py-3 font-semibold uppercase hover:bg-green-600"
      >
        Confirm Order
      </button>
    </form>
  );
};

export default Checkout;
