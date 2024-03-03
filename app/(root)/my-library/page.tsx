import Title from "@/components/ui/title";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const orders = await getOrdersByUser({ userId });
   console.log("orders", orders);

  return (
    <div className="ml-40 mt-5 text-6xl font-semibold text-white">
      <Title>Library</Title>
    </div>
  );
};

export default Page;
