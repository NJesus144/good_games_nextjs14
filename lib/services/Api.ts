
export async function getPlatform() {
  const respose = await fetch(
    `https://api.rawg.io/api/platforms?key=${process.env.API_KEY}`
  );
  const data = await respose.json();
  console.log(data.results)
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


  // return platforms;
}
