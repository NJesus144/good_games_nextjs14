"use client";
import React from "react";
import { NewGamesDetails } from "@/types";
import { useFavorite } from "@/providers/useFavorite";

import Image from "next/image";
import ButtonUi from "@/components/ui/button-ui";
import { Divider } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/categoryIcons";
import { changeRankMetacritic } from "@/lib/utils";
import { useCart } from "@/providers/useCart";

const GameCardDetails = ({ gameDetails }: { gameDetails: NewGamesDetails }) => {
  const { addToWishlist, isFavorite, removeFromWishlist } = useFavorite();
  const { addGameIntoCart } = useCart();

  const developer = gameDetails.developers.map((developer) => developer.name);
  const platforms = gameDetails.platforms.map(
    (platform) => platform.platform.name
  );

  const price = localStorage
    .getItem(`price_${gameDetails.id}`)
    ?.replace(".", ",");

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4  p-12 pb-20 text-white">
      <div className="flex max-lg:flex-col max-lg:items-center max-lg:gap-6">
        <Image
          src={gameDetails.background_image}
          height={0}
          width={0}
          alt="image of game"
          sizes="100vw"
          className="grow object-cover max-lg:w-full max-lg:grow-0 "
        />
        <div className="flex w-full max-w-sm grow-0 flex-col gap-4 px-6 max-lg:max-w-2xl max-sm:px-0">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold max-sm:text-3xl">
              {gameDetails.name}
            </h1>
            <div className="flex gap-2">
              <h2 className="text-lg ">R$ {price}</h2>
            </div>
          </div>

          <div className="flex flex-col gap-4 ">
            <ButtonUi otherStyle="w-full p-6 " color="primary">
              Buy Now
            </ButtonUi>
            <ButtonUi
              variant="bordered"
              otherStyle="p-6 hover:bg-[#2e2e2e]"
              onClick={() => addGameIntoCart(gameDetails)}
            >
              Add to Cart
            </ButtonUi>
            <ButtonUi
              variant="bordered"
              otherStyle="p-2 hover:bg-[#2e2e2e] "
              onClick={() => {
                if (isFavorite(gameDetails)) {
                  removeFromWishlist(gameDetails);
                } else {
                  addToWishlist(gameDetails);
                }
              }}
            >
              {isFavorite(gameDetails) ? "On the list" : "Wishlist"}
            </ButtonUi>
          </div>
          <div className="flex justify-between gap-2 max-sm:flex-col max-sm:text-sm">
            <span className="text-[#807e7e]">Developers</span>
            <span>{developer.join(", ")}</span>
          </div>
          <Divider className="bg-[#8d8d8d]" />
          <div className="flex justify-between gap-2 max-sm:flex-col max-sm:text-sm">
            <span className="text-[#807e7e]">Platforms</span>
            <span>{platforms.join(", ")}</span>
          </div>
          <Divider className="bg-[#8d8d8d]" />
          <div className="flex gap-2 max-sm:flex-col max-sm:text-sm">
            <span className="text-[#807e7e]">Genre</span>
            {gameDetails.genres.map((tag) => (
              <Badge
                key={tag.id}
                className="rounded-md bg-[#333] p-2 hover:bg-[#4e4e4e]"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
          <Divider className="bg-[#8d8d8d]" />
          <div className="flex  gap-2">
            <span className="text-[#807e7e]">Stores</span>

            {gameDetails.stores.map((item) => (
              <>
                {
                  CATEGORY_ICON[
                    item.store.name.replace(
                      /\s+/g,
                      ""
                    ) as unknown as keyof typeof CATEGORY_ICON
                  ]
                }
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <span className="text-2xl font-bold  ">{gameDetails.name}</span>
        <span
          className={`flex items-center justify-center rounded-md border px-2  ${changeRankMetacritic(
            gameDetails.metacritic
          )}`}
        >
          {gameDetails.metacritic}
        </span>
      </div>
      <div
        className="text-[#d8d6d6] max-sm:text-sm"
        dangerouslySetInnerHTML={{ __html: gameDetails.description }}
      ></div>
    </section>
  );
};

export default GameCardDetails;
