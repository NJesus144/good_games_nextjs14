import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ProviderNextUI } from "@/providers/ProviderNextUI";
import { ClerkProvider } from "@clerk/nextjs";
import { FavoriteProvider } from "@/contexts/favoriteContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <FavoriteProvider>
            <ProviderNextUI>{children}</ProviderNextUI>
          </FavoriteProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
