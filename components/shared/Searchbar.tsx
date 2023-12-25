"use client";

import { Input } from "@/components/ui/input";
import { getGamesBySearch } from "@/lib/actions/api.action";
import { Games } from "@/types";
import Link from "next/link";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Games[]>([]);
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(async () => {
      await searchGames(value);
    }, 1000);
  };

  const searchGames = async (value: string) => {
    const slug = value.toLowerCase().replace(/ /g, "-");
    const result = await getGamesBySearch(slug);
    setGames(result);

    setShowResults(true);
  };

  const closeResults = () => {
    setGames([]);
    setShowResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        inputRef.current &&
        !inputRef.current.contains(target) &&
        !(target instanceof Element && target.closest("a"))
      ) {
        closeResults();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div className=" relative w-[600px]  max-lg:hidden">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="relative flex min-h-[56px] w-full items-center gap-1 rounded-xl  px-4">
          <Input
            type="text"
            placeholder="Search 860,808 games"
            className="border-none bg-[#3B3B3B] p-6 pl-10 text-[16px] font-normal leading-[22.4px] shadow-none outline-none duration-300 ease-in-out hover:bg-[#fff] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            value={search}
            onChange={handleChange}
            ref={inputRef}
          />
          <div className="absolute left-5 top-4">
            <Image
              src="/assets/icons/search.svg"
              alt="Search"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </div>
      </form>
      {showResults && (
        <div className="scrollbar absolute inset-x-0 top-[56px] max-h-80 overflow-y-auto rounded-xl bg-white shadow-xl">
          <div className="flex flex-col gap-2 p-4">
            {games.map((game) => (
              <Link
                key={game.id}
                href={`/more-details/${game.slug}`}
                className="hover:bg-[#c9c9c9] p-1 px-2 rounded-md w-full  ease-in-out duration-300"
              >
                {game.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
