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
import User from "../database/models/user.models";

export const checkoutOrder = async (orders: CheckoutOrderParams[]) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const lineItems = orders.map(order => {
    return {
      price_data: {
        currency: "brl",
        unit_amount: Number(order.price) * 100,
        product_data: {
          name: order.productName,
        },
      },
      quantity: 1,
    };
  });
  
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      metadata: {
        orders: JSON.stringify(orders.map(order => ({
          productId: order.productId,
          buyerId: order.buyerId,
        }))),
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/my-library`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {

  try {
    await connectToDatabase();
    
    const product = await Product.findById(order.productId)
    console.log("product", product)

    const newOrder = await Order.create({
      ...order,
      product: product._id,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export async function getOrdersByUser({ userId }: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { buyer: userId };

    const orders = await Order.find(conditions)
     .populate({
      path: "product",
      model: Product,
      select: "_id name",
      populate: {
        path: "buyer",
        model: User,
        select: "_id firstName lastName",
      },
    });
    
    return {
      data: JSON.parse(JSON.stringify(orders)),
    };
  } catch (error) {
    handleError(error);
  }
}
