import React from "react";

import NavDetails from "@/components/shared/navbar/NavDetails";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" bg-[#202020]">
      <NavDetails/>
      {children}
    </section>
  );
};

export default layout;


