import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function SkeletonCardGame() {
  return (
    <Card
      className=" h-[350px] w-[340px] space-y-5 bg-zinc-800  p-4"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className=" h-[250px] rounded-lg bg-zinc-700"></div>
      </Skeleton>
      <div className="space-y-3 ">
        <Skeleton className="w-3/5 rounded-lg bg-zinc-700">
          <div className="h-3 w-3/5 rounded-lg "></div>
        </Skeleton>
        <div className="flex justify-between">
          <Skeleton className="w-4/5 rounded-lg bg-zinc-700">
            <div className="h-3 w-4/5 rounded-lg "></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg bg-zinc-700">
            <div className="h-3 w-2/5 rounded-lg "></div>
          </Skeleton>
        </div>
      </div>
    </Card>
  );
}
