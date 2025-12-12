import { prismadb } from "@/lib/prisma"
import { formatter } from "@/lib/utils"

export const getTotalRevenue = async ({ storeId }: { storeId: string }) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                }
            }
        }
    })

    const totalRevenue = paidOrders.reduce((total, order) => {
        return total + order.orderItems.reduce((orderTotal, item) => {
            return orderTotal + item.product.price.toNumber()
        }, 0)
    }, 0)

    return formatter.format(totalRevenue)
}