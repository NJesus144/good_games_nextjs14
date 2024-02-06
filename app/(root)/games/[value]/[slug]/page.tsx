import { auth } from "@clerk/nextjs";
import { getGamesFromCart } from "@/lib/actions/gameCart.actions";
import GamesByFilterPage from "./gamesByFilter";

export default async function GamesByFilter({ params }: { params: { value: string; slug: string } }) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const cart = await getGamesFromCart(userId);

  return <GamesByFilterPage userId={userId} cart={cart} params={params}/>;
}
