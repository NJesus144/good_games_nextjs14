import React from "react";
import { GameCard } from "@/components/shared/GameCard";
import { getGamesByGenre, getGamesByPlatform } from "@/lib/services/Api";

const Page = async ({ params }: { params: { value: string; slug: string } }) => {
 
console.log(params.value, params.slug)

    let games;
    switch (params.value) {
      case "genre":
        games = await getGamesByGenre(params.slug);
        break;

      case "platform":
        games = await getGamesByPlatform(params.slug);
        break;
      default:
        return <div>404</div>;
    }

  

  return (
    <div>
      <GameCard games={games} />
    </div>
  );
};

export default Page;
