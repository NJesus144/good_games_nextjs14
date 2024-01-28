
import { auth } from "@clerk/nextjs";
import GamesList from "./gamesList";



export default function Home() {

  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;


  return (
  <GamesList userId={userId}/>
  );
}
