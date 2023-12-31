"use client";
import OrderHeader from "@/components/shared/myOrder/OrderHeader";
import { useCart } from "@/providers/useCart";
import GameCardWishlist from "@/components/shared/cards/GameCardWishlist";
import React from "react";

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
      <OrderHeader />
      <div className="flex flex-col items-center gap-4 text-white  sm:ml-24">
        <GameCardWishlist games={cart}  isCart={true}/>
      </div>
    </>
  );
};

export default Cart;
