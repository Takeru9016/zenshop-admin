import { format } from "date-fns";

import { SizeColumn, SizeClient } from "@/components";
import { prismadb } from "@/lib/prisma";

export default async function SizesPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: (await params).storeId,
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
}
