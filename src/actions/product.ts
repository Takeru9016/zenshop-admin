"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prismadb } from "@/lib/prisma";

interface ProductData {
    name: string;
    price: number;
    categoryId: string;
    sizeId: string;
    colorId: string;
    images: { url: string }[];
    isFeatured?: boolean;
    isArchived?: boolean;
}

export async function createProduct(storeId: string, data: ProductData) {
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

        // Create product with images in a transaction
        const product = await prismadb.product.create({
            data: {
                name: data.name,
                price: data.price,
                categoryId: data.categoryId,
                sizeId: data.sizeId,
                colorId: data.colorId,
                isFeatured: data.isFeatured ?? false,
                isArchived: data.isArchived ?? false,
                storeId,
                images: {
                    createMany: {
                        data: data.images.map((image) => ({ url: image.url })),
                    },
                },
            },
        });

        revalidatePath(`/${storeId}/products`);

        return { success: true, product };
    } catch (error) {
        console.error("[CREATE_PRODUCT]", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function updateProduct(
    productId: string,
    storeId: string,
    data: ProductData
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

        // Update product and replace images in a transaction
        const product = await prismadb.product.update({
            where: {
                id: productId,
            },
            data: {
                name: data.name,
                price: data.price,
                categoryId: data.categoryId,
                sizeId: data.sizeId,
                colorId: data.colorId,
                isFeatured: data.isFeatured ?? false,
                isArchived: data.isArchived ?? false,
                images: {
                    deleteMany: {},
                    createMany: {
                        data: data.images.map((image) => ({ url: image.url })),
                    },
                },
            },
        });

        revalidatePath(`/${storeId}/products`);
        revalidatePath(`/${storeId}/products/${productId}`);

        return { success: true, product };
    } catch (error) {
        console.error("[UPDATE_PRODUCT]", error);
        return { success: false, error: "Failed to update product" };
    }
}

export async function deleteProduct(productId: string, storeId: string) {
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

        // Delete product (images will cascade delete automatically)
        await prismadb.product.delete({
            where: {
                id: productId,
            },
        });

        revalidatePath(`/${storeId}/products`);

        return { success: true };
    } catch (error) {
        console.error("[DELETE_PRODUCT]", error);
        return { success: false, error: "Failed to delete product" };
    }
}
