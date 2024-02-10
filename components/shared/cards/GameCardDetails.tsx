"use client";
import React, { useContext } from "react";

import { Games } from "@/types";
import { FavoriteContext } from "@/contexts/FavoriteContext";
import Image from "next/image";
import ButtonUi from "@/components/ui/button-ui";
import { Divider } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/categoryIcons";
import { changeRankMetacritic, currencyFormat } from "@/lib/utils";

import Link from "next/link";
import { CartContext } from "@/contexts/CartContext";

interface GameCardDetailsProps {
  gameDetails: Games;
  userId: string;
  cart: Games[];
}

const GameCardDetails = ({
  gameDetails,
  userId,
  cart,
}: GameCardDetailsProps) => {
  const { addToWishlist, isFavorite, removeFromWishlist } =
    useContext(FavoriteContext);
  const { addGameIntoCart } = useContext(CartContext);

  const developer = gameDetails.developers?.map((developer) => developer.name);
  const platforms = gameDetails.platforms.map(
    (platform) => platform.platform.name
  );

  const gameExists = cart.find((game: Games) => game.id === gameDetails.id);

  const price = localStorage.getItem(`price_${gameDetails.id}`);

  const newGame = {
    ...gameDetails,
    price: Number(price),
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4  p-12 pb-20 text-white">
      <div className="flex max-lg:flex-col max-lg:items-center max-lg:gap-6">
        <Image
          src={newGame.background_image}
          height={0}
          width={0}
          alt="image of game"
          sizes="100vw"
          className="grow object-cover max-lg:w-full max-lg:grow-0 "
        />
        <div className="flex w-full max-w-sm grow-0 flex-col gap-4 px-6 max-lg:max-w-2xl max-sm:px-0">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold max-sm:text-3xl">
              {newGame.name}
            </h1>
            <div className="flex gap-2">
              <h2 className="text-lg">{currencyFormat(newGame.price)}</h2>
            </div>
          </div>

          <div className="flex flex-col gap-4 ">
            <ButtonUi otherStyle="w-full p-6 " color="primary">
              <Link href="/cart">Buy Now</Link>
            </ButtonUi>

            {!gameExists ? (
              <ButtonUi
                variant="bordered"
                otherStyle="p-6 hover:bg-[#2e2e2e]"
                onClick={() => addGameIntoCart(newGame, userId)}
              >
                Add to Cart
              </ButtonUi>
            ) : (
              <Link href="/cart">
                <ButtonUi
                  variant="bordered"
                  otherStyle="p-6 hover:bg-[#2e2e2e] w-full"
                >
                  In Cart
                </ButtonUi>
              </Link>
            )}

            <ButtonUi
              variant="bordered"
              otherStyle="p-2 hover:bg-[#2e2e2e] "
              onClick={() => {
                if (isFavorite(newGame)) {
                  removeFromWishlist(newGame);
                } else {
                  addToWishlist(newGame, userId);
                }
              }}
            >
              {isFavorite(newGame) ? "On the list" : "Wishlist"}
            </ButtonUi>
          </div>
          <div className="flex justify-between gap-2 max-sm:flex-col max-sm:text-sm">
            <span className="text-[#807e7e]">Developers</span>
            <span>{developer?.join(", ")}</span>
          </div>
          <Divider className="bg-[#8d8d8d]" />
          <div className="flex justify-between gap-2 max-sm:flex-col max-sm:text-sm">
            <span className="text-[#807e7e]">Platforms</span>
            <span>{platforms.join(", ")}</span>
          </div>
          <Divider className="bg-[#8d8d8d]" />
          <div className="flex gap-2 max-sm:flex-col max-sm:text-sm">
            <span className="text-[#807e7e]">Genre</span>
            {newGame.genres.map((tag) => (
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

            {newGame.stores?.map((item) => (
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
        <span className="text-2xl font-bold  ">{newGame.name}</span>
        <span
          className={`flex items-center justify-center rounded-md border px-2  ${changeRankMetacritic(
            newGame.metacritic
          )}`}
        >
          {newGame.metacritic}
        </span>
      </div>
      <div
        className="text-[#d8d6d6] max-sm:text-sm"
        dangerouslySetInnerHTML={{ __html: newGame.description }}
      ></div>
    </section>
  );
};

export default GameCardDetails;
