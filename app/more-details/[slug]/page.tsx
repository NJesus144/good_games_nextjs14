import GameCardDetails from "@/components/shared/cards/GameCardDetails";
import React from "react";
import { getGameDetaislById } from "@/lib/actions/api.actions";
import { auth } from "@clerk/nextjs";


const Page = async ({ params }: { params: { slug: string } }) => {
  const gameDetails = await getGameDetaislById(params.slug);

  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string;


  return (
    <div>
      <GameCardDetails gameDetails={gameDetails} userId={userId}/>
    </div>
  );
};

export default Page;
