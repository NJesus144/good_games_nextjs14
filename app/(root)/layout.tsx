import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-[rgb(18,18,18)]">
      <Navbar />
      <div className="flex">
        Leftsidebar
        <section>
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default layout;
