import connectDb from '@/app/config/db';
import LogModel from '@/app/models/log';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connectDb();

        let data = await LogModel.find({}).populate('productId');
        return NextResponse.json({ success: true, status: StatusCodes.OK, data });
    } catch (error) {
        console.log(error, 'eroor');
        return NextResponse.json({
            success: false,
            message: 'Failed to create item',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}
