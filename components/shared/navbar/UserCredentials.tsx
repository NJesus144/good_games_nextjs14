import ButtonUi from "@/components/ui/button-ui";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";

const UserCredentials = () => {
  return (
    <NavbarContent justify="end">
      <div className="flex gap-4">
        <SignedOut>
          <ButtonUi color="primary">
            <Link href="/sign-in" className="text-white">Login</Link>
          </ButtonUi>
        </SignedOut>
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
