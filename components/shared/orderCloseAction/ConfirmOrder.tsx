import { currencyFormat } from "@/lib/utils";
// import { Games } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import Checkout from "./Checkout";
import { IGameInCart } from "@/lib/database/models/gamesInCart.models";

interface ConfirmOrderProps {
  cart: IGameInCart[];
  userId: string;
}

const ConfirmOrder = ({ cart, userId }: ConfirmOrderProps) => {
  const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0);

  return (
    <div className="mt-10 w-full  max-w-[900px]">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Total</h3>
        <p className="text-2xl font-semibold">{currencyFormat(totalAmount)}</p>
      </div>
      
      <SignedIn>
        <Checkout order={cart} userId={userId} />
      </SignedIn>
    </div>
  );
};

export default ConfirmOrder;
