import { Developers, Genre, Platform, Store } from "@/types";
import { Document, Schema, model, models } from "mongoose";

export interface IGame extends Document {
  quantity: number;
  subtotal: number;
  price: number;
  slug: string;
  rating: number;
  id: number;
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

const GameSchema = new Schema({
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  price: { type: Number, required: true },
  slug: { type: String, required: true },
  rating: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  metacritic: { type: Number, required: true },
  released: { type: Date, required: true },
  background_image: { type: String, required: true },
  background_image_additional: { type: String },
  developers: { type: Array },
  platforms: { type: Array, required: true },
  stores: { type: Array },
  genres: { type: Array, required: true },
  player: {type: Schema.Types.ObjectId, ref: "User"},
});

const Game = models.Game || model("Game", GameSchema);

export default Game;
