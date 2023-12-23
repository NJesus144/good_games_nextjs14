import React from "react";

import SkeletonCardGame from "@/components/ui/skeletonCardGame";

const loading = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <SkeletonCardGame key={item} />
      ))}
    </div>
  );
};

export default loading;
