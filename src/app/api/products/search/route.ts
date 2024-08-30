import connectDb from '@/app/config/db';
import ProductModel from '@/app/models/product';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    try {
        await connectDb();
        const body = await request.json();
        const { name } = body;
        let items = await ProductModel.find({
            name: { $regex: name, $options: 'i' },
        }).sort({ createdAt: -1 });

        return NextResponse.json({
            data: items,
            success: true,
            status: StatusCodes.OK,
        });
    } catch (error) {
        
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch items',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }

}
