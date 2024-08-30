'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Container from '../components/shared/container';
import { Button, Divider, notification } from 'antd';
import { FaPlus } from 'react-icons/fa';
import CreateProductModal from '../components/product/createProduct.modal';
import NoProducts from '../components/product/noProducts';
import {
    IProductsListData,
    IProductsListResponse,
} from '../interfaces/response/productsList.response';
import { StatusCodes } from 'http-status-codes';
import Loader from '../components/shared/loader';
import ProductCard from '../components/product/card';
import confirm from 'antd/es/modal/confirm';
import UpdateProductModal from '../components/product/updateProduct.modal';
import { IBaseResponse } from '../interfaces/response/baseResponse';
import ManageInventoryModal from '../components/product/manageInventory.modal';
import SellProductModal from '../components/product/sellProduct/index.modal';
import SearchProducts from '../components/product/searchProducts';
import { ProductFilterType } from '../enums/productFilterType';

const Products = () => {
    const [isCreateProduct, setIsCreateProduct] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<ProductFilterType | null>(null);
    const [productsList, setProductsList] = useState<IProductsListData[]>([]);
    const [produtsLoader, setProductsLoader] = useState<boolean>(false);
    const [isUpdateProduct, setIsUpdateProduct] = useState<boolean>(false);
    const [triggeredProduct, setTriggeredProduct] = useState<IProductsListData>();
    const [isManageInventory, setIsManageInventory] = useState<boolean>();
    const [isSellProduct, setIsSellProduct] = useState<boolean>(false);

    const getProductsList = useCallback(
        async (value?: ProductFilterType) => {
            setProductsLoader(true);

            try {
                const response = await fetch(
                    !value ? 'api/products' : `api/products?filterType=${value}`
                );
                const responseJSON: IProductsListResponse = await response.json();

                if (responseJSON.status === StatusCodes.OK) {
                    setProductsList(responseJSON.data);
                    setActiveFilter(null);
                } else {
                    notification.error({ message: responseJSON.message, type: 'error' });
                }
            } catch (error) {
                console.log(error, 'error');
            }

            setProductsLoader(false);
        },
        [setProductsLoader, notification]
    );

    const handleDeleteProduct = async (id: string) => {
        try {
            const response = await fetch('api/products', {
                method: 'DELETE',
                body: JSON.stringify({ productId: id }),
            });
            const responseJSON: IBaseResponse = await response.json();

            if (responseJSON.status === StatusCodes.OK) {
                notification.success({ message: 'Success!', type: 'success' });

                getProductsList();
            } else {
                notification.error({ message: responseJSON.message, type: 'error' });
            }
        } catch (error) {
            console.log(error, 'error');
        }
    };

    useEffect(() => {
        getProductsList();
    }, []);

    return (
        <Container>
            <div className="mb-6">
                <div className="flex justify-between">
                    <h1 className="text-xl font-medium">Products</h1>
                    <Button
                        onClick={() => setIsCreateProduct(true)}
                        type="primary"
                        icon={<FaPlus />}
                    >
                        Product
                    </Button>
                </div>
                <Divider />
                <SearchProducts
                    handleUpdateFilter={(value) => {
                        setActiveFilter(value);
                    }}
                    activeFilter={activeFilter}
                    refetchProducts={getProductsList}
                    setProductsLoader={setProductsLoader}
                    setProductsList={setProductsList}
                />
                <br />
                {produtsLoader ? (
                    <Loader />
                ) : productsList?.length > 0 ? (
                    <div className="grid grid-cols-12 gap-8">
                        {productsList.map((product) => (
                            <div
                                key={product._id}
                                className="sm:col-span-6 lg:col-span-4 col-span-12"
                            >
                                <ProductCard
                                    handleSellProduct={() => {
                                        setIsSellProduct(true);
                                        setTriggeredProduct(product);
                                    }}
                                    handleManageInventory={() => {
                                        setIsManageInventory(true);
                                        setTriggeredProduct(product);
                                    }}
                                    price={product.price}
                                    handleShowUpdateModal={() => {
                                        setIsUpdateProduct(true);
                                        setTriggeredProduct(product);
                                    }}
                                    handleShowDeleteConfirmation={() => {
                                        confirm({
                                            title: 'Do you want to delete this Product?',
                                            type: 'confirm',
                                            onOk: () => handleDeleteProduct(product._id),
                                        });
                                    }}
                                    description={product.description}
                                    stock={product.stock}
                                    name={product.name}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                        <NoProducts />
                    </div>
                )}
            </div>
            {isCreateProduct && (
                <CreateProductModal
                    refetchProducts={getProductsList}
                    isShowModal={isCreateProduct}
                    setIsShowModal={setIsCreateProduct}
                />
            )}
            {isUpdateProduct && triggeredProduct && (
                <UpdateProductModal
                    refetchProducts={getProductsList}
                    isShowModal={isUpdateProduct}
                    setIsShowModal={setIsUpdateProduct}
                    initialProduct={triggeredProduct}
                />
            )}
            {isManageInventory && triggeredProduct && (
                <ManageInventoryModal
                    refetchProducts={getProductsList}
                    product={triggeredProduct}
                    isShowModal={isManageInventory}
                    setIsShowModal={setIsManageInventory}
                />
            )}
            {isSellProduct && triggeredProduct && (
                <SellProductModal
                    refetchProducts={getProductsList}
                    product={triggeredProduct}
                    isShowModal={isSellProduct}
                    setIsShowModal={setIsSellProduct}
                />
            )}
        </Container>
    );
};

export default Products;
