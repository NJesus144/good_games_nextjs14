import React from "react";
import LeftSidebar from "@/components/shared/LeftSidebar";
import NavbarComponent from "@/components/shared/navbar/Navbar";
import { auth } from "@clerk/nextjs";


const layout = ({ children }: { children: React.ReactNode }) => {
  const {sessionClaims} = auth()

  const userId = sessionClaims?.userId as string;


  return (
    <main className="relative bg-[#151515]">
      <NavbarComponent />
      <div className="flex">
        <LeftSidebar userId={userId}/>

        <section className="flex min-h-screen flex-1  flex-col px-6 pb-6  max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-7xl  ">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default layout;
