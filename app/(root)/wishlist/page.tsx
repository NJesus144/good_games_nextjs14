"use client";
import React from "react";
import { useFavorite } from "@/providers/useFavorite";
import GameCardWishlist from "@/components/shared/cards/GameCardWishlist";
import Title from "@/components/ui/title";

const Page = () => {

  const { favorites } = useFavorite();

  return (
    <>
      <div className="ml-0 mt-5 text-6xl font-semibold text-white md:ml-24 xl:ml-48">
        <Title>Wishlist</Title>
      </div>
      
      {favorites.length === 0 && (
        <p className="ml-40 mt-6 flex flex-col text-white">
          You do not have any games saved in your wishlist.{" "}
          <span>
            {" "}
            {/* Try saving the games you're interested in and get notified whenever
            there's a promotion. */}
          </span>
        </p>
      )}
      <div className="mt-8 flex flex-col items-center gap-4 text-white  sm:ml-24">
        <GameCardWishlist games={favorites} isCart={false}/>
      </div>
    </>
  );
};

export default Page;
