import connectDb from '@/app/config/db';
import ProductModel from '@/app/models/product';
import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { IProductRequestPayload } from '@/app/interfaces/request/product.request';
import { ProductFilterType } from '@/app/enums/productFilterType';
import LogModel from '@/app/models/log';
export async function GET(request: Request) {
    try {
        await connectDb();
        const url = new URL(request.url);
        let filterType = url.searchParams.get('filterType');
        let query = {};
        const collation = { locale: 'en', strength: 2 };

        if (filterType === ProductFilterType.STOCKS) query = { stock: { $gt: 0, $exists: true } };
        let items = await ProductModel.find({ ...query })
            .collation(collation)
            .sort(
                filterType === ProductFilterType.A_TO_Z
                    ? { name: 1 }
                    : filterType === ProductFilterType.Z_TO_A
                      ? { name: -1 }
                      : { createdAt: -1 }
            );
        return NextResponse.json({
            data: items,
            success: true,
            status: StatusCodes.OK,
        });
    } catch (error) {
        console.log(error, 'error');
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch items',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

export async function POST(request: Request) {
    try {
        await connectDb();
        const body: IProductRequestPayload = await request.json();
        const { name } = body;
        let foundProduct = await ProductModel.findOne({
            name: { $regex: name, $options: 'i' },
        });
        if (foundProduct)
            return NextResponse.json({
                success: false,
                message: 'Product already exists!',
                status: StatusCodes.CONFLICT,
            });

        await ProductModel.create(body);

        return NextResponse.json({ success: true, status: StatusCodes.OK });
    } catch (error) {
        console.log(error, 'eroor');
        return NextResponse.json({
            success: false,
            message: 'Failed to create item',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDb();
        const body: IProductRequestPayload = await request.json();
        const { name, productId } = body;

        let foundProduct = await ProductModel.findById(productId);
        if (!foundProduct) {
            return NextResponse.json({
                success: false,
                message: "Product doesn't exists!",
                status: StatusCodes.BAD_REQUEST,
            });
        }
        if (name) {
            let isSameProductExist = await ProductModel.findOne({
                name: { $regex: name, $options: 'i' },
                _id: { $ne: foundProduct._id },
            });
            if (isSameProductExist)
                return NextResponse.json({
                    success: false,
                    message: 'Product with this name already exists!',
                    status: StatusCodes.CONFLICT,
                });
        }
        await ProductModel.findByIdAndUpdate(foundProduct._id, { $set: body });

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

export async function DELETE(request: Request) {
    try {
        await connectDb();
        const body: IProductRequestPayload = await request.json();
        const { productId } = body;
        await ProductModel.findByIdAndDelete(productId);
        await LogModel.deleteMany({ productId });

        return NextResponse.json({ success: true, status: StatusCodes.OK });
    } catch (error) {
        console.log(error, 'eroor');
        return NextResponse.json({
            success: false,
            message: 'Failed to delete item',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}
