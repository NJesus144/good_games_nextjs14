"use server";

import { GamePerUrl, Games } from "@/types";

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

export async function getGamesByGenre(
  size: number,
  page: number,
  slug: string
): Promise<GamePerUrl> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games?page_size=${size}&key=${process.env.API_KEY}&page=${page}&genres=${slug}`
    );

    const data = await respose.json();

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {} as GamePerUrl;
  }
}

export async function getGamesByPlatform(
  size: number,

  page: number,
  slug: string
): Promise<GamePerUrl> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games?page_size=${size}&key=${process.env.API_KEY}&page=${page}&platforms=${slug}`
    );
    const data = await respose.json();

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {} as GamePerUrl;
  }
}

export async function getGameDetaislById(slug: string): Promise<Games> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games/${slug}?key=${process.env.API_KEY}`
    );
    const data = await respose.json();

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {} as Games;
  }
}

export async function getGamesBySearch(slug: string): Promise<Games[]> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games?search=${slug}&key=${process.env.API_KEY}`
    );
    const data = await respose.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [] as Games[];
  }
}

export async function getNextPage(
  page: number,
  size: number
): Promise<GamePerUrl> {
  try {
    const respose = await fetch(
      `https://api.rawg.io/api/games?page_size=${size}&key=${process.env.API_KEY}&page=${page}`
    );

    const data = await respose.json();

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {} as GamePerUrl;
  }
}
