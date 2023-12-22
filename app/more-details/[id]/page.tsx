import GameCardDetails from "@/components/shared/game-card-details/GameCardDetails";
import React from "react";
import { getGameDetaislById } from "@/lib/services/Api";

const Page = async ({ params }: { params: { id: string } }) => {
  const gameDetails = await getGameDetaislById(params.id);

  return (
    <div>
      
      <GameCardDetails gameDetails={gameDetails} />
    </div>
  );
};

export default Page;
