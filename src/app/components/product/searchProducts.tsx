import { IProductsListData } from '@/app/interfaces/response/productsList.response';
import { Button, Dropdown, Form, Input, MenuProps, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { MdSearch } from 'react-icons/md';
import { debounce } from 'lodash';
import { IBaseResponse } from '@/app/interfaces/response/baseResponse';
import { StatusCodes } from 'http-status-codes';
import { RiStockFill } from 'react-icons/ri';
import { ProductFilterType } from '@/app/enums/productFilterType';

const SearchProducts = ({
    setProductsList,
    setProductsLoader,
    refetchProducts,
    handleUpdateFilter,
    activeFilter,
}: {
    setProductsList: (data: IProductsListData[]) => void;
    setProductsLoader: (value: boolean) => void;
    activeFilter: ProductFilterType | null;
    refetchProducts: (values?: ProductFilterType) => void;
    handleUpdateFilter: (values: ProductFilterType | null) => void;
}) => {
    const [filter, setFilter] = useState<ProductFilterType | null>();

    const items: MenuProps['items'] = [
        {
            key: ProductFilterType.STOCKS,
            label: <p className="text-base">In Stock</p>,
            icon: <RiStockFill className="!text-base text-green-500" />,
            onClick: () => {
                refetchProducts(ProductFilterType.STOCKS);
                handleUpdateFilter(ProductFilterType.STOCKS);
            },
        },
        {
            key: ProductFilterType.A_TO_Z,
            label: <p className="text-base">Alphabetically (A to Z)</p>,
            icon: <RiStockFill className="!text-base text-green-500" />,
            onClick: () => {
                refetchProducts(ProductFilterType.A_TO_Z);
                handleUpdateFilter(ProductFilterType.A_TO_Z);
            },
        },
        {
            key: ProductFilterType.Z_TO_A,
            label: <p className="text-base">Alphabetically (Z to A)</p>,
            icon: <RiStockFill className="!text-base text-green-500" />,
            onClick: () => {
                refetchProducts(ProductFilterType.Z_TO_A);
                handleUpdateFilter(ProductFilterType.Z_TO_A);
            },
        },

        ...(filter
            ? [
                  {
                      key: 'Reset',
                      label: <p className="text-base">Reset</p>,
                      icon: <RiStockFill className="!text-base text-green-500" />,
                      onClick: () => {
                          setFilter(null);
                          refetchProducts();
                      },
                  },
              ]
            : []),
    ];

    const searchProduct = debounce(async (value: string) => {
        setProductsLoader(true);
        try {
            let response = await fetch('/api/products/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: value }),
            });
            let responseJSON: IBaseResponse = await response.json();

            if (responseJSON.status === StatusCodes.OK) {
                setProductsList(responseJSON.data);
            } else {
                notification.error({ message: responseJSON.message, type: 'error' });
            }
        } catch (error) {
            console.log(error, 'error');
        }
        setProductsLoader(false);
    }, 1000);
    
    useEffect(() => {
        if (activeFilter) setFilter(activeFilter);
    }, [activeFilter]);

    return (
        <div className="flex justify-end">
            <div className="min-w-[25%] flex space-x-2">
                <Input
                    size="large"
                    onChange={(e) => {
                        if (!e.target.value) refetchProducts();
                        else searchProduct(e.target.value);
                        handleUpdateFilter(null);
                    }}
                    placeholder="Search here..."
                    prefix={<MdSearch className="text-xl" />}
                />

                <Dropdown
                    trigger={['click']}
                    menu={{
                        items: items.map((item) => {
                            if (item && item?.key === filter)
                                item.className = '!bg-[#1677ff] !text-[white]';
                            return item;
                        }),
                    }}
                    placement="bottomLeft"
                >
                    <Button
                        className={`${filter && '!bg-[#1677ff] !text-white'} `}
                        size="large"
                        icon={<CiFilter className={'mx-6'} />}
                    />
                </Dropdown>
            </div>
        </div>
    );
};

export default SearchProducts;
