import { IBaseResponse } from './baseResponse';

export interface IProductLogsResponse extends IBaseResponse {
    data: IProductLogsData[];
}

export interface IProductLogsData {
    _id: string;
    type: string;
    count: number;
    totalStockCount: number;
    productId: ProductId;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProductId {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
