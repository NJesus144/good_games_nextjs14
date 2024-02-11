import { auth } from "@clerk/nextjs";
import GamesList from "./gamesList";
import { getGamesFromCart } from "@/lib/actions/gameCart.actions";

export default async function Home() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const cart = await getGamesFromCart(userId);


  return <GamesList userId={userId} cart={cart} />;
}
