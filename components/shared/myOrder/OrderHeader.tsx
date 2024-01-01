"use client";
import { useCart } from "@/providers/useCart";

import { ShoppingBagIcon } from "lucide-react";

const OrderHeader = () => {
  const { cart } = useCart();
 

  return (
    <header className=" text-white">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl"> Your shopping cart</h3>
          <ShoppingBagIcon size={30} />
        </div>

        <span className="text-sky-500">
          <strong>{`${cart.length}`.padStart(2, "0")}</strong> Game(s)
        </span>
      </div>
    </header>
  );
};

export default OrderHeader;
