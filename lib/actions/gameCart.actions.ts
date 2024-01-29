"use server";
import { revalidatePath } from 'next/cache'
import { CreateGameParams, DeleteGameParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.models";
import GameInCart from "../database/models/gamesInCart.models";
import { handleError } from "../utils";

export const createGameCart = async ({ game, userId, path  }: CreateGameParams) => {
  try {
    await connectToDatabase();

    const playerCustomer = await User.findById(userId);

    if (!playerCustomer) throw new Error("Player not found");

    const newGame = await GameInCart.create({
      ...game,
      player: userId,
    })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newGame));
  } catch (error) {
    handleError(error);
  }
};

export const getGamesFromCart = async () => {
  try {
    await connectToDatabase();

    const games = await GameInCart.find();

    return JSON.parse(JSON.stringify(games));
  } catch (error) {
    handleError(error);
  }
};


export const removeGameFromCart = async ({gameId, path}: DeleteGameParams) => {
  try {
    await connectToDatabase();

    const deleteGame = await GameInCart.findByIdAndDelete(gameId);
    if(deleteGame) revalidatePath(path)

    
  } catch (error) {
    handleError(error);
  }
};