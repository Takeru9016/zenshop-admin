"use client";

import { UserButton } from "@clerk/nextjs";
import { Store } from "@prisma/client";

import StoreSwitcher from "@/components/StoreSwitcher";
import MainNav from "@/components/MainNav";

interface NavbarClientProps {
  stores: Store[];
}

export default function NavbarClient({ stores }: NavbarClientProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
