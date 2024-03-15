import { Schema, model, models, Document } from "mongoose";

export type IOrderItem = {
  _id: string;
  productId: string;
  productName: string;
  background: string;
  buyer: string;
};

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: number; // Alterado para tipo numérico
  items: IOrderItem[]; // Incluindo todos os itens na ordem
  buyer: { _id: string; firstName: string; lastName: string };
}

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: Number, // Alterado para tipo numérico
  },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      productName: String,
      background: String,
    },
  ], // Incluindo todos os itens na ordem
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
