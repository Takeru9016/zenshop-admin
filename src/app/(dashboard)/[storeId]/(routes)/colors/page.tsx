import { format } from "date-fns";

import { ColorsColumn, ColorsClient } from "@/components";
import { prismadb } from "@/lib/prisma";

export default async function ColorsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: (await params).storeId,
    },
  });

  const formattedColors: ColorsColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
}
