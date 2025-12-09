import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ colorId: string }> }
) {
    try {
        const { colorId } = await params;

        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 });
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: colorId,
            },
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log("[COLOR_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
