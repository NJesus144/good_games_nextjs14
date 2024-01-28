import React, { useContext } from "react";

import ButtonUi from "@/components/ui/button-ui";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

import { PlusIcon, ShoppingCartIcon } from "lucide-react";
import { changeRankMetacritic } from "@/lib/utils";
import { CartContext } from "@/contexts/CartContext";
import RemoveGameFromList, { CartButton, WishListButton } from "../RemoveGameFromList";
import { Games } from "@/types";

interface GameCardWishlistProps {
  games: Games[];
  isCart?: boolean;
}

const GameCardWishlist = ({ games, isCart }: GameCardWishlistProps) => {
  const { cart, addGameIntoCart } = useContext(CartContext);

 

  const select: CartButton | WishListButton = isCart ? { cart: true } : { wishlist: true };

  return (
    <>
      {games.map((mappedGame) => {
        const gameExists = cart.find((game) => game.id === mappedGame.id);
        
        return (
          <div
            key={mappedGame.id}
            className="flex h-full  max-h-[330px] w-full justify-between gap-4  max-lg:mb-8  max-lg:max-h-[800px]  max-lg:flex-col max-md:border max-md:border-[#333] "
          >
            <div className=" flex  gap-4 max-lg:flex-col">
              <div className="h-[150px] max-w-[300px] max-lg:max-w-full">
                <Image
                  src={mappedGame.background_image}
                  alt={mappedGame.name}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-full w-[300px]  object-cover max-lg:w-full"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="flex flex-col justify-around gap-2 pt-2 max-lg:px-8">
                <h1 className="text-xl uppercase max-sm:text-base">
                  {mappedGame.name}
                </h1>
                <div className="flex gap-2  max-sm:flex-col">
                  Metacritic:
                  <span
                    className={`flex items-center justify-center rounded-md border px-2 ${changeRankMetacritic(
                      mappedGame.metacritic
                    )}`}
                  >
                    {" "}
                    {mappedGame.metacritic}{" "}
                  </span>
                  <Link href={`/more-details/${mappedGame.slug}`}>
                    <button className="flex items-center gap-2 text-[#666] underline-offset-2 duration-300 ease-in-out hover:text-white hover:underline ">
                      More details <PlusIcon size={20} />
                    </button>
                  </Link>
                </div>
                <div className="flex gap-2 max-lg:flex-wrap max-md:hidden">
                  {mappedGame.genres.map((tag) => (
                    <Badge
                      key={tag.id}
                      className="rounded-md bg-[#333] p-2 hover:bg-[#4e4e4e]"
                    >
                      {tag.slug}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mr-12  flex min-w-[200px] flex-col justify-around max-lg:mr-0  max-lg:p-8">
              <p>R$ {String(mappedGame.price).replace(".", ",")}</p>
              <div className="flex flex-col gap-4 max-sm:w-full">
                {!gameExists ? (
                  <ButtonUi
                    color="primary"
                    otherStyle=" w-[100px] max-lg:w-full "
                    onClick={() => addGameIntoCart(mappedGame)}
                  >
                    <ShoppingCartIcon size={20} />
                  </ButtonUi>
                ) : (
                  <ButtonUi
                    color="primary"
                    otherStyle=" max-lg:w-full w-[100px]"
                  >
                    <Link href="/cart">In Cart</Link>
                  </ButtonUi>
                )}
                <RemoveGameFromList game={mappedGame} select={select}/>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GameCardWishlist;
