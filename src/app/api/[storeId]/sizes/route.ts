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

        const sizes = await prismadb.size.findMany({
            where: {
                storeId,
            },
        });

        return NextResponse.json(sizes);
    } catch (error) {
        console.log("[SIZES_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
