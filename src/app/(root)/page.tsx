"use client";

import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useEffect } from "react";

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <h1>Admin Dashboard</h1>
        <div className="flex items-center gap-6">
          <UserButton />
          <ModeToggle />
        </div>
      </nav>
      <main>Root Page</main>
    </>
  );
}
