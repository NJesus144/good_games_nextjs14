import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";

const UserCredentials = () => {
  return (
    <NavbarContent justify="end">
      <SignedOut>
        <div className="flex gap-4">
          <Link href="/sign-in">
            <Button
              size="sm"
              variant="solid"
              className="bg-[#0EA5E9] text-white"
            >
              Log in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              size="sm"
              variant="solid"
              className="bg-[#0EA5E9] text-white"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </SignedOut>

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
