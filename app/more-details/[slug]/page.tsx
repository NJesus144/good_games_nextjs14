import GameCardDetails from "@/components/shared/game-card-details/GameCardDetails";
import React from "react";
import { getGameDetaislById } from "@/lib/actions/api.action";

const Page = async ({ params }: { params: { slug: string } }) => {
  const gameDetails = await getGameDetaislById(params.slug);

  return (
    <div>
      <GameCardDetails gameDetails={gameDetails} />
    </div>
  );
};

export default Page;
