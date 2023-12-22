"use server";
import { GameDetails, GamePerUrl, Games } from "@/types";

export async function getGames(): Promise<Games[]> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}`
    );

    const data = await respose.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [] as Games[];
  }
}

export async function getGamesByGenre(slug: string): Promise<Games[]> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&genres=${slug}`
    );

    const data = await respose.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [] as Games[];
  }
}

export async function getGamesByPlatform(slug: string): Promise<Games[]> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&platforms=${slug}`
    );
    const data = await respose.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [] as Games[];
  }
}

export async function getGameDetaislById(slug: string): Promise<GameDetails> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games/${slug}?key=${process.env.API_KEY}`
    );
    const data = await respose.json();

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {} as GameDetails;
  }
}


export async function getNextPage(page: number ): Promise<GamePerUrl> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}`
    );

    const data = await respose.json();


    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {} as GamePerUrl;
  }
}