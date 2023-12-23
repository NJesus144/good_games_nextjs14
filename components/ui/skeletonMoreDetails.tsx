import { Divider } from "@nextui-org/react";

import React from "react";

const SkeletonMoreDetails = () => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4  p-28 pb-20 text-white">
      <div className="flex max-lg:flex-col max-lg:items-center max-lg:gap-6">
        <div className="max-h-[500px] grow animate-pulse bg-gradient-to-r from-gray-400 max-lg:w-full max-lg:grow-0"></div>

        <div className="flex w-full max-w-sm grow-0 flex-col gap-4 px-6 max-lg:max-w-2xl max-sm:px-0">
          <div className="flex items-center rounded-lg">
            <h1 className="h-5 w-5 animate-pulse bg-gradient-to-r from-gray-400 text-4xl font-bold max-sm:text-3xl"></h1>

            <h2 className="h-5 w-5 animate-pulse bg-gradient-to-r from-gray-400"></h2>
          </div>

          <div className="flex h-[200px] w-full animate-pulse flex-col gap-4 rounded-lg ">
            <button className="w-full rounded-lg bg-gradient-to-r from-gray-500 p-6"></button>
            <button className="w-full rounded-lg bg-gradient-to-r from-gray-500 p-6"></button>
            <button className="w-full rounded-lg bg-gradient-to-r from-gray-500 p-6"></button>
          </div>
          <div className="flex h-[30px] w-full animate-pulse gap-2 rounded-lg bg-gradient-to-r from-gray-400 max-sm:flex-col max-sm:text-sm"></div>
          <Divider className="bg-[#8d8d8d]" />
          <div className="flex h-[30px] w-full animate-pulse  gap-2 rounded-lg bg-gradient-to-r from-gray-400 max-sm:flex-col max-sm:text-sm"></div>
          <Divider className="bg-[#8d8d8d]" />
          <div className="flex h-[30px] w-full animate-pulse  gap-2 rounded-lg bg-gradient-to-r from-gray-400 max-sm:flex-col max-sm:text-sm"></div>
          <Divider className="bg-[#8d8d8d]" />
          <div className="flex  h-[30px]  w-full animate-pulse gap-2 rounded-lg bg-gradient-to-r from-gray-400"></div>
        </div>
      </div>
      <div className="flex h-[30px]  w-full animate-pulse gap-4 rounded-lg bg-gradient-to-r from-gray-400"></div>
      <div className="h-[100px] rounded-lg bg-gradient-to-r from-gray-400"></div>
    </section>
  );
};

export default SkeletonMoreDetails;
