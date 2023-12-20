"use client";
import * as React from "react";

import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Game } from "@/types";

export function GameCard({ games }: { games: Game[] }) {
  return (
    <div className="ml-0 flex max-w-7xl flex-col items-center  gap-8  pb-20 sm:grid-cols-2 md:ml-24 md:grid  lg:grid-cols-2  xl:ml-48 xl:grid-cols-3">
      {games.map((item) => (
        <Card
          key={item.id}
          className="mt-10 h-[380px] w-[340px] max-w-[340px] border-0  text-white max-lg:w-[280px] max-md:mt-20"
        >
          <Image
            src={item.background_image}
            alt={item.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-[250px] w-full rounded-t-lg object-cover"
          />

          <CardFooter className="flex h-[100%] max-h-[180px] flex-col justify-between gap-4 rounded-b-lg bg-[#202024] p-2 py-8">
            <p>{item.name}</p>
            <div className="flex w-full items-center justify-between">
              <Button>Add to car</Button>
              <span>{2345345}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
