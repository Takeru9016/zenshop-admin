"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prisma";

export async function updateStore(storeId: string, data: { name: string }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: storeId,
                userId,
            },
            data: {
                name: data.name,
            },
        });

        if (store.count === 0) {
            return { success: false, error: "Store not found or unauthorized" };
        }

        // Revalidate to refresh the UI automatically
        revalidatePath(`/${storeId}`);
        revalidatePath(`/${storeId}/settings`);

        return { success: true, store };
    } catch (error) {
        console.error("[UPDATE_STORE]", error);
        return { success: false, error: "Failed to update store" };
    }
}

export async function deleteStore(storeId: string) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        const result = await prismadb.store.deleteMany({
            where: {
                id: storeId,
                userId,
            },
        });

        if (result.count === 0) {
            return { success: false, error: "Store not found or unauthorized" };
        }

        // Revalidate root to refresh store list
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("[DELETE_STORE]", error);
        return { success: false, error: "Failed to delete store" };
    }
}
