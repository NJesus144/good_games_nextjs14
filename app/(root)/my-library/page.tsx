import { getOrdersByUser } from "@/lib/actions/order.actions";
import { formatDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { ArrowDown } from "lucide-react";
import ButtonUi from "@/components/ui/button-ui";

interface Items {
  _id: string;
  productId: string;
  productName: string;
  background: string;
  buyer: string;
  createdAt: string;
}

interface Order {
  _id: string;
  createdAt: Date;
  stripeId: string;
  totalAmount: number;
  items: Items[];
  buyer: string;
}

const Page = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const orders = await getOrdersByUser({ userId });

  const selectedOrders = orders?.data.map((order: Order) => {
    return order.items.map((item) => ({
      _id: item._id,
      productId: item.productId,
      productName: item.productName,
      background: item.background,
      createdAt: order.createdAt,
    }));
  });

  const purchaseDate = orders?.data.map((order: Order) => order.createdAt);
  const date = purchaseDate?.map((date: string) => date);

  console.log("date", date);

  return (
    <div className="mt-5 text-6xl font-semibold text-white sm:ml-20  xl:ml-48">
      <section className="w-full  overflow-x-auto p-5 md:px-10 lg:mx-auto xl:px-0">
        <h1 className="text-5xl">Library</h1>
        <table className="w-full border-collapse border-t ">
          <thead className="max-lg:hidden">
            <tr className="border-b text-[14px] font-medium leading-[20px] text-gray-500">
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Name</th>
              <th className="min-w-[250px] py-3 text-left">Download to play</th>

              <th className="min-w-[100px] py-3 text-left">
                added to account in
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedOrders && selectedOrders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No games found.
                </td>
              </tr>
            ) : (
              <>
                {selectedOrders?.map((order: Items[]) =>
                  order.map((item: Items) => (
                    <tr
                      key={item._id}
                      className=" gap-4 border-b text-[14px] font-normal  leading-[20px] max-md:flex max-md:flex-col  lg:text-[16px] lg:leading-[24px]"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="flex min-w-[200px] flex-1  items-end gap-2 py-4 pr-4">
                        <Image
                          src={item.background}
                          alt={item.productName}
                          width={100}
                          height={100}
                        />
                        {item.productName}
                      </td>
                      <td>
                        <ButtonUi color="primary">
                          Dowload <ArrowDown />{" "}
                        </ButtonUi>
                      </td>
                      <td className="min-w-[150px] py-4">
                        {formatDate(item.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Page;
