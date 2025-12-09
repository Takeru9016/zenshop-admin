import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ categoryId: string }> }
) {
    try {
        const { categoryId } = await params;

        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: categoryId,
            },
            include: {
                billboard: true,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORY_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
