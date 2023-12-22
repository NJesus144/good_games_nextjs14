import React from "react";
import NavbarComponent from "@/components/shared/navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" bg-[#202020]">
      <NavbarComponent />
      {children}
    </section>
  );
};

export default layout;
