import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import NavbarClient from "./NavbarClient";
import { prismadb } from "@/lib";

export default async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: { userId },
  });

  return <NavbarClient stores={stores} />;
}
