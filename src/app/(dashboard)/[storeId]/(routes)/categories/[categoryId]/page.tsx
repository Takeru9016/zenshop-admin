import { CategoryForm } from "@/components";
import { prismadb } from "@/lib/prisma";

export default async function CategoryFormPage({
  params,
}: {
  params: Promise<{ categoryId: string; storeId: string }>;
}) {
  const category = await prismadb.category.findUnique({
    where: {
      id: (await params).categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: (await params).storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
}
