import GameCardDetails from "@/components/shared/cards/GameCardDetails";
import React from "react";
import { getGameDetaislById } from "@/lib/actions/api.actions";

const Page = async ({ params }: { params: { slug: string } }) => {
  const gameDetails = await getGameDetaislById(params.slug);

  return (
    <div>
      <GameCardDetails gameDetails={gameDetails} />
    </div>
  );
};

export default Page;
