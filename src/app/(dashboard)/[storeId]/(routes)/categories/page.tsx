import { format } from "date-fns";

import { CategoryClient, CategoryColumn } from "@/components";
import { prismadb } from "@/lib/prisma";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: (await params).storeId,
    },
    include: {
      billboard: true,
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
