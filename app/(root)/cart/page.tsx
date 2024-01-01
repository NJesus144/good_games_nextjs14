"use client";
import OrderHeader from "@/components/shared/myOrder/OrderHeader";
import { useCart } from "@/providers/useCart";
import GameCardWishlist from "@/components/shared/cards/GameCardWishlist";
import React from "react";
import ConfirmOrder from "@/components/shared/orderCloseAction/ConfirmOrder";

const Cart = () => {
  const { cart } = useCart();

  if (cart.length === 0)
    return (
      <h1 className="p-6 text-2xl text-white">
        Oops! It looks like you have no games in your cart.
      </h1>
    );

  return (
    <>
      <div className="m-auto flex max-w-5xl flex-col gap-4 pt-6 text-white sm:ml-24 md:ml-24 xl:ml-48">
        <OrderHeader />
        <GameCardWishlist games={cart} isCart={true} />

        <ConfirmOrder />
      </div>
    </>
  );
};

export default Cart;
