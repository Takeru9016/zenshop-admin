"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prisma";

interface CategoryData {
    name: string;
    billboardId: string;
}

export async function createCategory(storeId: string, data: CategoryData) {
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

        const category = await prismadb.category.create({
            data: {
                name: data.name,
                billboardId: data.billboardId,
                storeId,
            },
        });

        revalidatePath(`/${storeId}/categories`);

        return { success: true, category };
    } catch (error) {
        console.error("[CREATE_CATEGORY]", error);
        return { success: false, error: "Failed to create category" };
    }
}

export async function updateCategory(
    categoryId: string,
    storeId: string,
    data: CategoryData
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

        const category = await prismadb.category.update({
            where: {
                id: categoryId,
            },
            data: {
                name: data.name,
                billboardId: data.billboardId,
            },
        });

        revalidatePath(`/${storeId}/categories`);
        revalidatePath(`/${storeId}/categories/${categoryId}`);

        return { success: true, category };
    } catch (error) {
        console.error("[UPDATE_CATEGORY]", error);
        return { success: false, error: "Failed to update category" };
    }
}

export async function deleteCategory(categoryId: string, storeId: string) {
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

        await prismadb.category.delete({
            where: {
                id: categoryId,
            },
        });

        revalidatePath(`/${storeId}/categories`);

        return { success: true };
    } catch (error) {
        console.error("[DELETE_CATEGORY]", error);
        return { success: false, error: "Failed to delete category" };
    }
}
