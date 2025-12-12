import { prismadb } from "@/lib/prisma"

export const getSalesCount = async ({ storeId }: { storeId: string }) => {
    const salesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true,
        },
    })

    return salesCount
}