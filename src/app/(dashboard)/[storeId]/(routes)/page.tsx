import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prisma";

export default async function StorePage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { userId } = await auth();
  const { storeId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  return (
    <>
      <main>
        Store Dashboard Page : {store?.name}
        Store ID: {store?.id}
      </main>
    </>
  );
}
