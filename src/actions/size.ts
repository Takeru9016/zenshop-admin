"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prisma";

interface SizeData {
    name: string;
    value: string;
}

export async function createSize(storeId: string, data: SizeData) {
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

        const size = await prismadb.size.create({
            data: {
                name: data.name,
                value: data.value,
                storeId,
            },
        });

        revalidatePath(`/${storeId}/sizes`);

        return { success: true, size };
    } catch (error) {
        console.error("[CREATE_SIZE]", error);
        return { success: false, error: "Failed to create size" };
    }
}

export async function updateSize(
    sizeId: string,
    storeId: string,
    data: SizeData
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

        const size = await prismadb.size.update({
            where: {
                id: sizeId,
            },
            data: {
                name: data.name,
                value: data.value,
            },
        });

        revalidatePath(`/${storeId}/sizes`);
        revalidatePath(`/${storeId}/sizes/${sizeId}`);

        return { success: true, size };
    } catch (error) {
        console.error("[UPDATE_SIZE]", error);
        return { success: false, error: "Failed to update size" };
    }
}

export async function deleteSize(sizeId: string, storeId: string) {
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

        await prismadb.size.delete({
            where: {
                id: sizeId,
            },
        });

        revalidatePath(`/${storeId}/sizes`);

        return { success: true };
    } catch (error) {
        console.error("[DELETE_SIZE]", error);
        return { success: false, error: "Failed to delete size" };
    }
}
