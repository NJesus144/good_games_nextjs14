"use client";
import React, { useState, useEffect } from "react";
import { GameCard } from "@/components/shared/GameCard";
import { getGamesByGenre, getGamesByPlatform } from "@/lib/actions/api.action";
import PaginationControls from "@/components/shared/paginationControls";
import { GamesWithPrice } from "@/types";
import SkeletonCardGame from "@/components/ui/skeletonCardGame";
import { generateAndSetRandomPrice } from "@/lib/utils";

// return (
//   <div>
//     <GameCard games={gamesData} />
//     <PaginationControls
//       page={page}
//       setPage={setPage}
//       totalPages={totalPages}
//       loading={loading}

//     />
//   </div>
// );

const Page = ({ params }: { params: { value: string; slug: string } }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [gamesData, setGamesData] = useState<GamesWithPrice[]>([]);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 20;

  const getGamesPreSlug = async () => {
    setLoading(true);
    let gamesWithPrices: GamesWithPrice[];
    let games;
    switch (params.value) {
      case "genre":
        games = await getGamesByGenre(page, params.slug);
        setTotalPages(Math.ceil(games.count / itemsPerPage));

        gamesWithPrices = games.results.map((game) => ({
          ...game,
          price: generateAndSetRandomPrice(game.id),
        }));
        setGamesData(gamesWithPrices);
        setLoading(false);
        break;

      case "platform":
        games = await getGamesByPlatform(page, params.slug);
        setTotalPages(Math.ceil(games.count / itemsPerPage));
        gamesWithPrices = games.results.map((game) => ({
          ...game,
          price: generateAndSetRandomPrice(game.id),
        }));
        setGamesData(gamesWithPrices);
        setLoading(false);
        break;
      default:
        return <div>404</div>;
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
