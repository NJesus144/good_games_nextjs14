import React from "react";
import SkeletonCardGame from "@/components/ui/skeletonCardGame";

const loading = () => {
  return (
    <div className="ml-64 grid grid-cols-3 gap-6 pt-20">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <SkeletonCardGame key={n} />
      ))}
    </div>
  );
};

export default loading;
