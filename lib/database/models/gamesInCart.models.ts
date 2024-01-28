import { Developers, Genre, Platform, Store } from "@/types";
import { Document, Schema, model, models } from "mongoose";

export interface IGameInCart extends Document {
  _id: string;
  quantity: number;
  subtotal: number;
  price: number;
  slug: string;
  rating: number;
  name: string;
  description: string;
  metacritic: number;
  released: Date;
  background_image: string;
  background_image_additional?: string;
  developers?: Developers[];
  platforms: Platform[];
  stores?: Store[];
  genres: Genre[];
}

const GameInCartSchema = new Schema({
  quantity: { type: Number },
  subtotal: { type: Number },
  price: { type: Number },
  slug: { type: String, required: true },
  rating: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  metacritic: { type: Number },
  released: { type: Date },
  background_image: { type: String, required: true },
  background_image_additional: { type: String },
  developers: { type: Array },
  platforms: { type: Array },
  stores: { type: Array },
  genres: { type: Array },
  player: { type: Schema.Types.ObjectId, ref: "User" },
});

const GameInCart= models.GameInCart || model("GameInCart", GameInCartSchema);

export default GameInCart;
