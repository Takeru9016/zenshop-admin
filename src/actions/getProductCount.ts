import { prismadb } from "@/lib/prisma"

export const getProductCount = async ({ storeId }: { storeId: string }) => {
    const productCount = await prismadb.product.count({
        where: {
            storeId,
        },
    })

    return productCount
}