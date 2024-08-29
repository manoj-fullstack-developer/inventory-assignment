import { Button, Card, Dropdown, MenuProps, Tooltip } from 'antd';
import Image from 'next/image';
import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdDelete, MdEdit, MdInventory } from 'react-icons/md';

type ProductCardProps = {
    name: string;
    description: string;
    stock: number;
    price: number;
    handleShowDeleteConfirmation: () => void;
    handleShowUpdateModal: () => void;
    handleManageInventory: () => void;
    handleSellProduct: () => void;
};

const ProductCard = ({
    description,
    stock,
    name,
    price,
    handleShowDeleteConfirmation,
    handleShowUpdateModal,
    handleSellProduct,
    handleManageInventory,
}: ProductCardProps) => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <p className="text-base">Delete</p>,
            icon: <MdDelete className="!text-base text-red-500" />,
            onClick: () => handleShowDeleteConfirmation(),
        },
        {
            key: '2',
            label: <p className="text-base">Update</p>,
            icon: <MdEdit className="!text-base text-blue-600" />,
            onClick: () => handleShowUpdateModal(),
        },
        {
            key: '3',
            label: <p className="text-base">Manage Inventory</p>,
            icon: <MdInventory className="!text-base text-green-700" />,
            onClick: () => handleManageInventory(),
        },
    ];

    return (
        <Card className="flex flex-col sunset-font  ">
            <div className="text-center break-words flex flex-col items-center">
                <Image
                    width={100}
                    height={100}
                    className="w-full max-h-[350px] lg:max-h-[250px] object-cover rounded-md"
                    src={
                        'https://plus.unsplash.com/premium_photo-1675876811959-ae0358cbf0e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UHxlbnwwfHwwfHx8MA%3D%3D'
                    }
                    alt="productCard"
                />
                <p className="text-2xl font-semibold my-2">{name}</p>
                <Tooltip title={description}>
                    <p className="truncate max-w-full">{description}</p>
                </Tooltip>
                <p className="mt-2">Price: ${price}</p>

                <div className="flex items-center space-x-3 mb-2 w-full">
                    <Tooltip
                        className="w-full"
                        color="red"
                        title={!stock && 'Currently out of Stock!'}
                    >
                        <Button
                            onClick={() => handleSellProduct()}
                            disabled={!stock}
                            type="primary"
                            className="w-full mt-3"
                            size="large"
                        >
                            Sell
                        </Button>
                    </Tooltip>

                    <Dropdown trigger={['click']} menu={{ items }} placement="topLeft">
                        <Button
                            size="large"
                            className="mt-3"
                            icon={<HiOutlineDotsHorizontal className="text-2xl mx-5" />}
                        />
                    </Dropdown>
                </div>
                <p className="text-base">Stocks Available: {stock}</p>
            </div>
        </Card>
    );
};

export default ProductCard;
