import connectDb from '@/app/config/db';
import { InventorySubmitType } from '@/app/enums/inventorySubmitType';
import LogModel from '@/app/models/log';
import OrderModel from '@/app/models/order';
import ProductModel from '@/app/models/product';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        await connectDb();

        const body = await request.json();
        const { email, quantity, productId } = body;
        const foundProduct = await ProductModel.findById(productId);

        if (!foundProduct) {
            return NextResponse.json({
                success: false,
                message: "Product doesn't exist!",
                status: StatusCodes.NOT_FOUND,
            });
        }

        const stock = foundProduct.stock - quantity;
        const updatedProductDoc = await ProductModel.findByIdAndUpdate(
            foundProduct._id,
            {
                $set: { stock },
            },
            { new: true }
        );
        const orderDoc = await OrderModel.create({ email, quantity, productId });

        await LogModel.create({
            type: InventorySubmitType.SUBTRACT,
            count: quantity,
            totalStockCount: updatedProductDoc.stock,
            productId: foundProduct._id,
            order: orderDoc._id,
        });

        return NextResponse.json({ success: true, status: StatusCodes.OK });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to create order',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}
