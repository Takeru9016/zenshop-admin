import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ billboardId: string }> }
) {
    try {
        const { billboardId } = await params;

        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: billboardId,
            },
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
