"use server";

import { IGameInCart } from "../database/models/gamesInCart.models";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { CreateOrderParams } from "@/types";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import { handleError } from "../utils";

export const checkoutOrder = async (order: IGameInCart[], userId: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  // const gameId = order.map((game) => game._id);

  // eslint-disable-next-line no-useless-catch

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/my-library`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    metadata: {
      buyerId: userId,
    },
    line_items: order.map((game) => {
      return {
        price_data: {
          currency: "brl",

          unit_amount: game.price * 100,
          product_data: {
            name: game.name,
          },
        },
        quantity: game.quantity,
      };
    }),
  });

  redirect(session.url!);
};


export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      //  event: order.,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}