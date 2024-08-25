import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

export const metadata: Metadata = {
  title: "ZenShop Admin Panel",
  description: "Admin panel for ZenShop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body>
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
