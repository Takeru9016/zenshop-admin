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

        const colors = await prismadb.color.findMany({
            where: {
                storeId,
            },
        });

        return NextResponse.json(colors);
    } catch (error) {
        console.log("[COLORS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
