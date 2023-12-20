import React from "react";

import { getGamesByGenre } from "@/lib/services/Api";
import { GameCard } from "@/components/shared/GameCard";

const Platform = async ({ params }: { params: { slug: string } }) => {
  const games = await getGamesByGenre(params.slug);

  return (
    <div>
      <GameCard games={games} />
    </div>
  );
};

export default Platform;
