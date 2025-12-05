"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prisma";

interface BillboardData {
    label: string;
    imageUrl: string;
}

export async function createBillboard(storeId: string, data: BillboardData) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Verify the store belongs to the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return { success: false, error: "Unauthorized" };
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label: data.label,
                imageUrl: data.imageUrl,
                storeId,
            },
        });

        revalidatePath(`/${storeId}/billboards`);

        return { success: true, billboard };
    } catch (error) {
        console.error("[CREATE_BILLBOARD]", error);
        return { success: false, error: "Failed to create billboard" };
    }
}

export async function updateBillboard(
    billboardId: string,
    storeId: string,
    data: BillboardData
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Verify the store belongs to the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return { success: false, error: "Unauthorized" };
        }

        const billboard = await prismadb.billboard.update({
            where: {
                id: billboardId,
            },
            data: {
                label: data.label,
                imageUrl: data.imageUrl,
            },
        });

        revalidatePath(`/${storeId}/billboards`);
        revalidatePath(`/${storeId}/billboards/${billboardId}`);

        return { success: true, billboard };
    } catch (error) {
        console.error("[UPDATE_BILLBOARD]", error);
        return { success: false, error: "Failed to update billboard" };
    }
}

export async function deleteBillboard(billboardId: string, storeId: string) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Verify the store belongs to the user
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return { success: false, error: "Unauthorized" };
        }

        await prismadb.billboard.delete({
            where: {
                id: billboardId,
            },
        });

        revalidatePath(`/${storeId}/billboards`);

        return { success: true };
    } catch (error) {
        console.error("[DELETE_BILLBOARD]", error);
        return { success: false, error: "Failed to delete billboard" };
    }
}
