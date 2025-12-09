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

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId,
            },
        });

        return NextResponse.json(billboards);
    } catch (error) {
        console.log("[BILLBOARDS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
