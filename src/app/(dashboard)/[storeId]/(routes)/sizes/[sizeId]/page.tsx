import { SizeForm } from "@/components";
import { prismadb } from "@/lib/prisma";

export default async function SizeFormPage({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) {
  const sizes = await prismadb.size.findUnique({
    where: {
      id: (await params).sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizes} />
      </div>
    </div>
  );
}
