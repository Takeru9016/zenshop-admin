import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import Navbar from "@/components/navs/Navbar";
import { prismadb } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ storeId: string }>;
}>) {
  const { userId } = await auth();
  const { storeId } = await params;

  if (!userId) {
    return redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
