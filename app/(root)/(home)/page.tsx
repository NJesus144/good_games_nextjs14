import { getGames } from "@/lib/services/Api";
import { GameCard } from "@/components/shared/GameCard";

export default async function Home() {

const games = await getGames();

  return (
    <div>
      <GameCard games={games}/>
    </div>
  );
}
