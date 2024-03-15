/* eslint-disable no-useless-catch */
"use server";

import Product from "../database/models/product.model";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByUserParams,
} from "@/types";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import { handleError } from "../utils";
// import User from "../database/models/user.models";

export const checkoutOrder = async (
  orders: CheckoutOrderParams[],
  userId: string
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const lineItems = orders.map((order) => ({
    price_data: {
      currency: "brl",
      product_data: {
        name: order.productName,
      },
      unit_amount: Number(order.price) * 100,
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/my-library`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    await createOrder({
      stripeId: session.id,
      productIds: orders.map((order) => order.productId),
      buyerId: userId,
      totalAmount: orders.reduce(
        (total, order) => total + Number(order.price),
        0
      ),
      createdAt: new Date(),
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};
export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const products = await Product.find({ _id: { $in: order.productIds } });

    // Mapear os produtos para o formato de itens de ordem
    const orderItems = products.map((product) => ({
      productId: product._id,
      productName: product.name,
      background: product.background_image,
    }));

    // Criar a ordem no banco de dados incluindo os itens
    const newOrder = await Order.create({
      ...order,
      buyer: order.buyerId,
      items: orderItems,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};
// export const createOrder = async (order: CreateOrderParams) => {
//   try {
//     await connectToDatabase();

//     const product = await Product.findById(order.productId);

//     const newOrder = await Order.create({
//       ...order,
//       product: product._id,
//       buyer: order.buyerId,
//     });

//     return JSON.parse(JSON.stringify(newOrder));
//   } catch (error) {
//     handleError(error);
//   }
// };

export async function getOrdersByUser({ userId }: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { buyer: userId };

    // console.log("conditions", conditions);

    const orders = await Order.find(conditions);

    // const orders = await Order.find(conditions).populate({
    //   path: "product",
    //   model: Product,
    //   populate: {
    //     path: "player",
    //     model: User,
    //     select: "_id firstName lastName",
    //   },
    // });

    return {
      data: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    handleError(error);
  }
}
