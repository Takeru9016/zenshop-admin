import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    try {
        const { storeId } = await params;

        if (!storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId,
            },
            include: {
                billboard: true,
            },
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log("[CATEGORIES_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
