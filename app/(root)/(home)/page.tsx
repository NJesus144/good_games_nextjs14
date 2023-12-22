"use client";
import { getNextPage } from "@/lib/actions/api.action";
import { GameCard } from "@/components/shared/GameCard";
import { useEffect, useState } from "react";
import PaginationControls from "@/components/shared/paginationControls";
import { Games } from "@/types";

export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [gamesData, setGamesData] = useState<Games[]>([]);
  const [loading, setLoading] = useState(false);

  const itensPerPage = 20;

  const getGamesPerUrl = async () => {
    setLoading(true);
    const games = await getNextPage(page);
    setTotalPages(Math.ceil(games.count / itensPerPage));
    setGamesData(games.results);
    setLoading(false);
  };

  useEffect(() => {
    getGamesPerUrl();
  }, [page]);

  return (
    <div>
      <GameCard games={gamesData} />
      <PaginationControls
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        loading={loading}
     
      />
    </div>
  );
}
