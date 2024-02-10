import React from "react";
import { auth } from "@clerk/nextjs";

import OrderHeader from "@/components/shared/myOrder/OrderHeader";
import Card from "@/components/shared/cards/Card";
import ConfirmOrder from "@/components/shared/orderCloseAction/ConfirmOrder";

import { getGamesFromCart } from "@/lib/actions/gameCart.actions";

const Cart = async () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const cart = await getGamesFromCart(userId);

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
        <Card games={cart} isCart={true} userId={userId} cart={cart} />

        <ConfirmOrder cart={cart}/>
      </div>
    </>
  );
};

export default Cart;
