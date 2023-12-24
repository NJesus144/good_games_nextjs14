import React from "react";

import SkeletonCardGame from "@/components/ui/skeletonCardGame";

const loading = () => {
  return (
    <div className="ml-0 flex max-w-7xl flex-col items-center  gap-8  pb-20 sm:grid-cols-2 md:ml-24 md:grid  lg:grid-cols-2  xl:ml-48 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <SkeletonCardGame key={item} />
      ))}
    </div>
  );
};

export default loading;
