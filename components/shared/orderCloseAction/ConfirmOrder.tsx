"use client";
import { currencyFormat } from "@/lib/utils";
import { useCart } from "@/providers/useCart";
import React from "react";

const ConfirmOrder = () => {
  const { cart, confirmOrder } = useCart();

  const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0);

  return (
    <div className="mt-10 w-full  max-w-[900px]">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Total</h3>
        <p className="text-2xl font-semibold">{currencyFormat(totalAmount)}</p>
      </div>
      <button className="w-full rounded-md bg-green-500 py-3 font-semibold uppercase hover:bg-green-600" onClick={confirmOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default ConfirmOrder;
