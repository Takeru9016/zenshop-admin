import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ThemesProvider } from "@/providers/ThemesProvider";

export const metadata: Metadata = {
  title: "Zenshop - Admin Dashboard",
  description: "Zenshop - Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemesProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
