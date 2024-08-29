// models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
    },
    { timestamps: true }
);

let ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;
