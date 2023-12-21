export async function getGamesByGenre(slug: string) {
  const respose = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&genres=${slug}`
  );

  const data = await respose.json();

  return data.results;
}

export async function getGamesByPlatform(slug: string) {
  const respose = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&platforms=${slug}`
  );
  const data = await respose.json();

  return data.results;
}
