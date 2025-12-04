import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prisma";
import { SettingsForm } from "@/components";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: (await params).storeId,
      userId,
    },
  });

  if (!store) {
    return redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}
