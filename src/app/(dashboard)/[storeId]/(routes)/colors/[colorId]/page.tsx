import { ColorsForm } from "@/components";
import { prismadb } from "@/lib/prisma";

export default async function ColorsFormPage({
  params,
}: {
  params: Promise<{ colorId: string }>;
}) {
  const colors = await prismadb.color.findUnique({
    where: {
      id: (await params).colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsForm initialData={colors} />
      </div>
    </div>
  );
}
