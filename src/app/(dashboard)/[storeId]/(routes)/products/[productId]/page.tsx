import { ProductsForm } from "@/components";
import { prismadb } from "@/lib/prisma";

export default async function ProductsFormPage({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) {
  const products = await prismadb.product.findUnique({
    where: {
      id: (await params).productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: (await params).storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: (await params).storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: (await params).storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsForm
          initialData={
            products
              ? ({
                  ...products,
                  price: products.price.toNumber(),
                } as any)
              : null
          }
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
}
