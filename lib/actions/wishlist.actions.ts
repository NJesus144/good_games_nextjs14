"use server"

import { CreateGameParams, DeleteGameParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.models";
import Wishlist from "../database/models/wishlist.models";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";


export const addGameWishlist = async ({ game, userId, path  }: CreateGameParams) => {
  try {
    await connectToDatabase();

    const plaeyerUser = await User.findById(userId);

    if (!plaeyerUser) throw new Error("Player not found");

    const newGame = await Wishlist.create({
      ...game,
      player: userId,
    })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newGame));
  } catch (error) {
    handleError(error);
  }
};

export const getGamesFromWishlist = async () => {
  try {
    await connectToDatabase();

    const games = await Wishlist.find();

    return JSON.parse(JSON.stringify(games));
  } catch (error) {
    handleError(error);
  }
};


export const removeGameFromWishlist = async ({gameId, path}: DeleteGameParams) => {
  try {
    await connectToDatabase();

    const deleteGame = await Wishlist.findByIdAndDelete(gameId);
    if(deleteGame) revalidatePath(path)

    
  } catch (error) {
    handleError(error);
  }
};