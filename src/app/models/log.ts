import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import OrderModel from './order';
import ProductModel from './product';

export interface ILog extends Document {
    orderId?: ObjectId;
    type: string;
    stock: number;
    totalProductsCount: number;
    productId: ObjectId;
}

const LogSchema: Schema = new Schema(
    {
        order: { type: mongoose.Types.ObjectId, ref: OrderModel },
        type: { type: String, required: true },
        count: { type: Number, required: true },
        totalStockCount: { type: Number, required: true },
        productId: { type: mongoose.Types.ObjectId, required: true, ref: ProductModel },
    },
    { timestamps: true }
);

const LogModel = mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);

export default LogModel;
