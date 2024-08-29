import { InventorySubmitType } from '@/app/enums/inventorySubmitType';
import { IBaseResponse } from '@/app/interfaces/response/baseResponse';
import { IProductsListData } from '@/app/interfaces/response/productsList.response';
import { Button, Divider, Input, Modal, notification } from 'antd';
import { StatusCodes } from 'http-status-codes';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

type ManageInventoryModalProps = {
    isShowModal: boolean;
    setIsShowModal: (value: boolean) => void;
    product: IProductsListData;
    refetchProducts: () => void;
};

const ManageInventoryModal = ({
    isShowModal,
    setIsShowModal,
    product,
    refetchProducts,
}: ManageInventoryModalProps) => {
    const [stocks, setStocks] = useState<number>();
    const [isUpdateInventoryLoading, setIsUpdateInventoryLoading] = useState<{
        type: InventorySubmitType;
        loading: boolean;
    }>();

    const updateInventory = async (type: InventorySubmitType) => {
        try {
            setIsUpdateInventoryLoading({ type, loading: true });
            if (stocks) {
                let response = await fetch('api/inventory', {
                    method: 'PUT',
                    body: JSON.stringify({ productId: product._id, stock: stocks, type }),
                });
                let responseJSON: IBaseResponse = await response.json();

                if (responseJSON.status === StatusCodes.OK) {
                    notification.success({ message: 'Success!', type: 'success' });
                    refetchProducts();
                    setIsShowModal(false);
                } else notification.error({ message: responseJSON.message, type: 'error' });
            }
        } catch (error) {
            console.log(error, 'error');
        }
        setIsUpdateInventoryLoading({ type, loading: false });
    };

    return (
        <Modal
            footer={null}
            width={500}
            title={'Manage Inventory'}
            open={isShowModal}
            onCancel={() => setIsShowModal(false)}
            onClose={() => setIsShowModal(false)}
        >
            <Divider />

            <Input onChange={(e) => setStocks(Number(e.target.value))} type="number" size="large" />
            <div className="flex gap-4 mt-6">
                <Button
                    loading={
                        isUpdateInventoryLoading &&
                        isUpdateInventoryLoading.type === InventorySubmitType.SUBTRACT &&
                        isUpdateInventoryLoading.loading
                    }
                    onClick={() => updateInventory(InventorySubmitType.SUBTRACT)}
                    disabled={!stocks || product.stock < stocks}
                    icon={<FaMinus />}
                    type="primary"
                    className="w-full !bg-red-500"
                    size="large"
                >
                    Subtract
                </Button>

                <Button
                    loading={
                        isUpdateInventoryLoading &&
                        isUpdateInventoryLoading.type === InventorySubmitType.ADD &&
                        isUpdateInventoryLoading.loading
                    }
                    onClick={() => updateInventory(InventorySubmitType.ADD)}
                    disabled={!stocks || stocks > 200}
                    icon={<FaPlus />}
                    type="primary"
                    className="w-full !bg-blue-800"
                    size="large"
                >
                    Add
                </Button>
            </div>
        </Modal>
    );
};

export default ManageInventoryModal;
