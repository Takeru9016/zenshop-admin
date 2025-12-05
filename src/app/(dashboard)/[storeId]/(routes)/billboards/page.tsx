import { format } from "date-fns";

import { BillboardClient, BillboardColumn } from "@/components";
import { prismadb } from "@/lib/prisma";

export default async function BillboardsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: (await params).storeId,
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
