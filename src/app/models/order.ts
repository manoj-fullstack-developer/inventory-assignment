import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import ProductModel from './product';

export interface IOrder extends Document {
    email: string;
    productId: ObjectId;
    quantity: number;
}

const OrderSchema: Schema = new Schema<IOrder>(
    {
        email: { type: String, required: true },
        productId: { type: mongoose.Types.ObjectId, ref: ProductModel },
        quantity: { type: Number, required: true },
    },
    { timestamps: true }
);

let OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;
