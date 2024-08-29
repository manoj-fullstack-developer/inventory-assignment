import connectDb from '@/app/config/db';
import { InventorySubmitType } from '@/app/enums/inventorySubmitType';
import LogModel from '@/app/models/log';
import ProductModel from '@/app/models/product';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    try {
        await connectDb();
        const body = await request.json();
        let { stock, productId, type } = body;
        let foundProduct = await ProductModel.findById(productId);
        if (!foundProduct) {
            return NextResponse.json({
                success: false,
                message: "Product doesn't exists!",
                status: StatusCodes.BAD_REQUEST,
            });
        }

        let modifyStocks = stock;
        if (type === InventorySubmitType.ADD) modifyStocks = modifyStocks + foundProduct.stock;
        else {
            modifyStocks = foundProduct.stock - stock;
        }

        let updatedProductDoc = await ProductModel.findByIdAndUpdate(
            foundProduct._id,
            { $set: { stock: modifyStocks } },
            { new: true }
        );

        await LogModel.create({
            type,
            count: stock,
            stock: modifyStocks,
            totalStockCount: updatedProductDoc.stock,
            productId: foundProduct._id,
        });

        return NextResponse.json({ success: true, status: StatusCodes.OK });
    } catch (error) {
        console.log(error, 'eroor');
        return NextResponse.json({
            success: false,
            message: 'Failed to update item',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}
