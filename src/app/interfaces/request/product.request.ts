export interface IProductRequestPayload {
    name: string;
    description: string;
    price: number;
    stock: number;
    productId?: string;
}
