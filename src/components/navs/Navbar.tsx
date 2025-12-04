import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

import ModeToggle from "@/components/theme/ModeToggle";
import MainNavbar from "@/components/navs/MainNavbar";
import StoreSwitcher from "@/components/common/StoreSwitcher";
import { prismadb } from "@/lib/prisma";

export default async function Navbar() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNavbar className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
