"use client";

import { getNextPage } from "@/lib/actions/api.action";
import { GameCard } from "@/components/shared/cards/GameCard";
import { useEffect, useState } from "react";
import PaginationControls from "@/components/shared/paginationControls";

import SkeletonCardGame from "@/components/ui/skeletonCardGame";
import { generateAndSetRandomPrice } from "@/lib/utils";
import { GamesWithPrice } from "@/types";


export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [gamesData, setGamesData] = useState<GamesWithPrice[]>([]);
  const [loading, setLoading] = useState(false);

  const itensPerPage = 20;

  useEffect(() => {
    setLoading(true);
    async function getGames() {
      try {
        const games = await getNextPage(page);
        setTotalPages(Math.ceil(games.count / itensPerPage));

        const gamesWithPrices: GamesWithPrice[] = games.results.map((game) => ({
          ...game,
          price: generateAndSetRandomPrice(game.id),
        }));

        setGamesData(gamesWithPrices);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    }

    getGames();
  }, [page]);

  return (
    <div>
      
      {gamesData.length === 0 ? (
        <div className="ml-0 flex max-w-7xl flex-col items-center  gap-8  pb-20 sm:grid-cols-2 md:ml-24 md:grid  lg:grid-cols-2  xl:ml-48 xl:grid-cols-3">
          {Array.from({ length: itensPerPage }).map((_, index) => (
            <SkeletonCardGame key={index} />
          ))}
        </div>
      ) : (
        <>
          <GameCard games={gamesData} />
          <PaginationControls
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}
