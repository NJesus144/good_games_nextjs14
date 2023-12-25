import * as React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { changeRankMetacritic } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import { GamesWithPrice } from "@/types";
import { useFavorite } from "@/providers/useFavorite";
import ButtonUi from "@/components/ui/button-ui";
import { PlusIcon, ShoppingCartIcon } from "lucide-react";

export function GameCard({ games }: { games: GamesWithPrice[] }) {
  const { addToWishlist, removeFromWishlist, isFavorite } = useFavorite();

  return (
    <>
      <div className="ml-0 flex max-w-7xl flex-col items-center  gap-16   pb-20 sm:grid-cols-2 md:ml-24 md:grid  lg:grid-cols-2  xl:ml-48 xl:grid-cols-3">
        {games.map((item) => (
          <Card
            key={item.id}
            className="mt-12 h-[350px]  w-[340px] max-w-[340px] border-0  text-white max-lg:w-[280px] max-md:mt-20"
          >
            <Image
              src={item.background_image}
              alt={item.name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-[250px] w-full rounded-t-lg object-cover"
            />

            <CardFooter className="flex h-full max-h-[190px] flex-col items-start  justify-between gap-4 rounded-b-lg bg-[#202020] p-2 px-4 py-8  max-lg:py-0  max-lg:justify-center">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-left text-xl font-bold max-md:text-base">
                  {item.name}
                </h3>
                <span
                  className={`rounded-md border px-2 ${changeRankMetacritic(
                    item.metacritic
                  )}`}
                >
                  {item.metacritic}
                </span>
              </div>
              <div className="flex gap-2">
                <Link href={`/more-details/${item.slug}`}>
                  <button className="flex items-center gap-2 text-[#666] underline-offset-2 duration-300 ease-in-out hover:text-white hover:underline ">
                    More details <PlusIcon size={20} />
                  </button>
                </Link>
                <span className="lg:hidden">
                  R$ {String(item.price).replace(".", ",")}
                </span>
              </div>
              <div className="flex w-full items-center justify-between  max-lg:flex-col-reverse max-lg:gap-1">
                <ButtonUi otherStyle="bg-sky-500 max-lg:w-full ">
                  <ShoppingCartIcon size={20} />
                </ButtonUi>
                <ButtonUi
                  variant="bordered"
                  otherStyle="hover:bg-[#2e2e2e] max-lg:w-full"
                  onClick={() =>
                    isFavorite(item)
                      ? removeFromWishlist(item)
                      : addToWishlist(item)
                  }
                >
                  <span>{isFavorite(item) ? "On the list" : "Wishlist"}</span>
                </ButtonUi>
                <span className="max-lg:hidden">
                  R$ {String(item.price).replace(".", ",")}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
