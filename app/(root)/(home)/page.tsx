"use client";
import { getNextPage } from "@/lib/actions/api.action";
import { GameCard } from "@/components/shared/GameCard";
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

  const getGamesPerUrl = async () => {
    setLoading(true);
    const games = await getNextPage(page);
    setTotalPages(Math.ceil(games.count / itensPerPage));

    const gamesWithPrices: GamesWithPrice[] = games.results.map((game) => ({
      ...game,
      price: generateAndSetRandomPrice(game.id),
    }));

    gamesWithPrices.forEach((game) => {
      console.log(`Preço para ${game.name}: $${game.price}`);
    });

    setGamesData(gamesWithPrices);

    setLoading(false);
  };

  useEffect(() => {
    getGamesPerUrl();
  }, [page]);

  return (
    <div>
      {gamesData.length === 0 ? (
        <div className="grid grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SkeletonCardGame key={item} />
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
