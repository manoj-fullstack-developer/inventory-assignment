import connectDb from '@/app/config/db';
import LogModel from '@/app/models/log';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET() {
    try {
        await connectDb();
        const data = await LogModel.find({}).populate('productId');

        return NextResponse.json({ success: true, status: StatusCodes.OK, data });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to get all logs',
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}
