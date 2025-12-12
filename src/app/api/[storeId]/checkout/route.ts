import { NextResponse } from "next/server"
import Stripe from "stripe"

import { prismadb } from "@/lib/prisma"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ storeId: string }> }
) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-11-17.clover",
    })

    const { productIds } = await req.json()
    const { storeId } = await params

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return NextResponse.json(
            { error: 'Product IDs are required' },
            { status: 400, headers: corsHeaders }
        )
    }

    // Fetch products with their details
    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    })

    if (products.length === 0) {
        return NextResponse.json(
            { error: 'No products found' },
            { status: 404, headers: corsHeaders }
        )
    }

    // Create line items for Stripe
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map((product) => ({
        quantity: 1,
        price_data: {
            currency: 'INR', // Changed to INR for Indian Stripe accounts
            product_data: {
                name: product.name,
            },
            unit_amount: Math.round(Number(product.price) * 100), // Convert to paise (smallest currency unit)
        }
    }))

    // Create order in database
    const order = await prismadb.order.create({
        data: {
            storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
        metadata: {
            orderId: order.id,
        }
    })

    return NextResponse.json(
        { url: session.url },
        { headers: corsHeaders }
    )
}