import { auth } from "@clerk/nextjs";
import Wishlist from "./wishlist";
import { getGamesFromCart } from "@/lib/actions/gameCart.actions";

export default async function Home() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const cart = await getGamesFromCart(userId);

  return <Wishlist userId={userId} cart={cart}/>;
}
