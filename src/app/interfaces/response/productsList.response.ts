import { IBaseResponse } from "./baseResponse";

export interface IProductsListResponse extends IBaseResponse {
    data: IProductsListData[];
  }
  
  export interface IProductsListData {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    __v: number;
  }