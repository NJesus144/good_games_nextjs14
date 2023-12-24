import ButtonUi from "@/components/ui/button-ui";
import { GamesWithPrice } from "@/types";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavorite } from "@/providers/useFavorite";

import React from "react";

const GameCardWishlist = ({ games }: { games: GamesWithPrice[] }) => {
  const { favorites, setFavorites } = useFavorite();

  const removeFromWishlist = (game: GamesWithPrice) => {
    setFavorites(favorites.filter((item) => item.id !== game.id));
  };

  return (
    <>
      {games.map((item) => (
        <div
          key={item.id}
          className="flex h-full max-h-[330px] w-full max-w-[450px] gap-4 max-sm:max-w-[200px] max-sm:flex-col"
        >
          <div className="h-[150px] w-[200px] bg-slate-500">
            <Image
              src={item.background_image}
              alt={item.name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-full w-full grow object-cover"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex grow-0 flex-col justify-between">
            <h1>{item.name}</h1>
            <p>R$ {String(item.price).replace(".", ",")}</p>
            <div className="flex flex-col gap-2">
              <Link href={`/more-details/${item.slug}`}>
                <button className="flex items-center gap-2 text-[#666] underline-offset-2 duration-300 ease-in-out hover:text-white hover:underline ">
                  More details <PlusIcon size={20} />
                </button>
              </Link>
              <ButtonUi variant="bordered" otherStyle="hover:bg-[#2e2e2e]" onClick={() =>{
                removeFromWishlist(item)
              }}>
                Remove
              </ButtonUi>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GameCardWishlist;
