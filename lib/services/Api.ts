
export async function getGamesByGenre(slug: string) {
  const respose = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&genres=${slug}`
  );
  console.log(slug);
  const data = await respose.json();

  // const allPlatforms = data.results.map((item: any) => item.name);
  // const selectedPlatforms = [
  //   "PC",
  //   "Playstation 4",
  //   "Xbox One",
  //   "Nintendo Switch",
  //   "iOS",
  //   "Android",
  // ];

  // const platforms = allPlatforms.filter((platform: any) =>
  //   selectedPlatforms.includes(platform)
  // );

  return data.results;
}
