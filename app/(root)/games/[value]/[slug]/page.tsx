"use client";
import React, { useState, useEffect } from "react";
import { GameCard } from "@/components/shared/cards/GameCard";
import { getGamesByGenre, getGamesByPlatform } from "@/lib/actions/api.action";
import PaginationControls from "@/components/shared/paginationControls";
import { GamesWithPrice } from "@/types";
import SkeletonCardGame from "@/components/ui/skeletonCardGame";
import { generateAndSetRandomPrice } from "@/lib/utils";

const Page = ({ params }: { params: { value: string; slug: string } }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [gamesData, setGamesData] = useState<GamesWithPrice[]>([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 21;

  interface FetchFunctionProps {
    fetchFunction: (
      itemsPerPage: number,
      page: number,
      slug: string
    ) => Promise<{ count: number; results: GamesWithPrice[] }>;
  }

  const loadGames = async ({ fetchFunction }: FetchFunctionProps) => {
    setLoading(true);
    try {
      const games = await fetchFunction(itemsPerPage, page, params.slug);
      setTotalPages(Math.ceil(games.count / itemsPerPage));
      const gamesWithPrices = games.results.map((game) => ({
        ...game,
        price: generateAndSetRandomPrice(game.id),
      }));
      setGamesData(gamesWithPrices);
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const getGamesPreSlug = async () => {
    switch (params.value) {
      case "genre":
        await loadGames({ fetchFunction: getGamesByGenre });
        break;

      case "platform":
        await loadGames({ fetchFunction: getGamesByPlatform });
        break;
      default:
        throw new Error("Invalid value");
    }
  };

  useEffect(() => {
    getGamesPreSlug();
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
};

export default Page;
