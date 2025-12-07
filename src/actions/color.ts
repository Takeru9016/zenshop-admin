"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prisma";

interface ColorData {
    name: string;
    value: string;
}

export async function createColor(storeId: string, data: ColorData) {
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

        const color = await prismadb.color.create({
            data: {
                name: data.name,
                value: data.value,
                storeId,
            },
        });

        revalidatePath(`/${storeId}/colors`);

        return { success: true, color };
    } catch (error) {
        console.error("[CREATE_COLOR]", error);
        return { success: false, error: "Failed to create color" };
    }
}

export async function updateColor(
    colorId: string,
    storeId: string,
    data: ColorData
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

        const color = await prismadb.color.update({
            where: {
                id: colorId,
            },
            data: {
                name: data.name,
                value: data.value,
            },
        });

        revalidatePath(`/${storeId}/colors`);
        revalidatePath(`/${storeId}/colors/${colorId}`);

        return { success: true, color };
    } catch (error) {
        console.error("[UPDATE_COLOR]", error);
        return { success: false, error: "Failed to update color" };
    }
}

export async function deleteColor(colorId: string, storeId: string) {
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

        await prismadb.color.delete({
            where: {
                id: colorId,
            },
        });

        revalidatePath(`/${storeId}/colors`);

        return { success: true };
    } catch (error) {
        console.error("[DELETE_COLOR]", error);
        return { success: false, error: "Failed to delete color" };
    }
}
