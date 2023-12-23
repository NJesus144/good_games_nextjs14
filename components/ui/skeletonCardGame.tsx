import React from "react";
import { Card, CardFooter } from "@/components/ui/card";

import { Button } from "@nextui-org/react";

export default function SkeletonCardGame() {
  return (
    <div className="ml-0 flex max-w-7xl flex-col items-center  gap-8   pb-20 sm:grid-cols-2  md:ml-24  md:grid lg:grid-cols-2 xl:ml-48 xl:grid-cols-3">
      <Card className="mt-12 h-[350px] w-[340px] max-w-[340px] animate-pulse  rounded-lg border-0 max-lg:w-[280px] max-md:mt-20">
        <div className="h-[250px] w-full animate-pulse rounded-lg bg-gradient-to-r from-zinc-700"></div>

        <CardFooter className="flex h-[100%] max-h-[170px] animate-pulse flex-col items-start justify-between gap-4 rounded-b-lg bg-[#202020] p-2 px-4  py-8">
          <div className="flex w-full items-center justify-between">
            <h3 className="h-[10px] animate-pulse rounded-lg bg-gradient-to-r from-zinc-500 text-left text-xl font-bold"></h3>
            <span className="h-[20px] animate-pulse rounded-lg bg-gradient-to-r from-zinc-500"></span>
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <Button className="w-full animate-pulse rounded-lg bg-gradient-to-r from-zinc-500"></Button>
            <span className="w-[40px] animate-pulse rounded-lg bg-gradient-to-r from-zinc-500 p-3"></span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
