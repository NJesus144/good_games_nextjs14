"use client";
import * as React from "react";

import { Card, CardFooter } from "@/components/ui/card";
import { changeRankMetacritic } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Games } from "@/types";
import Link from "next/link";

export function GameCard({ games }: { games: Games[] }) {
  return (
    <div className="ml-0 flex max-w-7xl flex-col items-center  gap-8  pb-20 sm:grid-cols-2 md:ml-24 md:grid  lg:grid-cols-2  xl:ml-48 xl:grid-cols-3">
      {games.map((item) => (
        <Link key={item.id} href={`/more-details/${item.id}`}>
        <Card
          key={item.id}
          className="mt-12 h-[350px] w-[340px] max-w-[340px] border-0  text-white max-lg:w-[280px] max-md:mt-20"
        >
          <Image
            src={item.background_image}
            alt={item.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-[250px] w-full rounded-t-lg object-cover"
          />

          <CardFooter className="flex h-[100%] max-h-[170px] flex-col items-start justify-between gap-4 rounded-b-lg bg-[#202020] p-2 px-4 py-8">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-left text-xl font-bold">{item.name}</h3>
              <span
                className={`rounded-md border px-2 ${changeRankMetacritic(
                  item.metacritic
                )}`}
              >
                {item.metacritic}
              </span>
            </div>
            <div className="flex w-full items-center justify-between">
              <Button>Add to car</Button>
              <span>{2345345}</span>
            </div>
          </CardFooter>
        </Card></Link>
      ))}
    </div>
  );
}
