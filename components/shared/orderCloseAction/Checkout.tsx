"use client";
import { loadStripe } from "@stripe/stripe-js";

import { checkoutOrder } from "@/lib/actions/order.actions";
import { IGameInCart } from "@/lib/database/models/gamesInCart.models";
import React, { useEffect } from "react";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({order,userId,}: {order: IGameInCart[];userId: string;}) => {
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
    await checkoutOrder(order, userId);

    // await checkoutOrder(order)
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
