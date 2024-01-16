import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";

const UserCredentials = () => {
  return (
    <NavbarContent justify="end">
      <div className="flex gap-4">
        <SignedOut>
          <Button size="sm" variant="solid" className="bg-[#0EA5E9] text-white">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>

        {/* <Button size="sm" variant="solid" className="bg-[#0EA5E9] text-white">
          <Link href="/sign-up">Sign up</Link>
        </Button> */}
      </div>

      <NavbarItem>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#0070F0",
              },
            }}
          />
        </SignedIn>
      </NavbarItem>
    </NavbarContent>
  );
};

export default UserCredentials;
