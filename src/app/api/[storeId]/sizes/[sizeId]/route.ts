import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ sizeId: string }> }
) {
    try {
        const { sizeId } = await params;

        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 });
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: sizeId,
            },
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log("[SIZE_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
