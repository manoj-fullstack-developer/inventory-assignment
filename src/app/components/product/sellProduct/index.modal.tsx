import { Divider, Modal, notification } from 'antd';
import React, { useState } from 'react';
import SellProductForm from './form';
import { IProductsListData } from '@/app/interfaces/response/productsList.response';
import { ICreateOrderRequestPayload } from '@/app/interfaces/request/order.request';
import { IBaseResponse } from '@/app/interfaces/response/baseResponse';
import { StatusCodes } from 'http-status-codes';

type SellProductModalProps = {
    isShowModal: boolean;
    setIsShowModal: (value: boolean) => void;
    product: IProductsListData;
    refetchProducts: () => void;
};

const SellProductModal = ({
    isShowModal,
    setIsShowModal,
    product,
    refetchProducts,
}: SellProductModalProps) => {
    const [createOrderLoading, setCreateOrderLoading] = useState<boolean>();

    const handleCreateOrder = async (values: ICreateOrderRequestPayload) => {
        setCreateOrderLoading(true);
        try {
            let response = await fetch('api/order', {
                method: 'POST',
                body: JSON.stringify({ ...values, productId: product._id }),
            });
            let responseJSON: IBaseResponse = await response.json();
            if (responseJSON.status === StatusCodes.OK) {
                notification.success({ message: 'Success!', type: 'success' });
                setIsShowModal(false);
                refetchProducts();
            } else {
                notification.error({ message: responseJSON.message, type: 'error' });
            }
        } catch (error) {
            console.log(error, 'error');
        }
        setCreateOrderLoading(false);
    };

    return (
        <Modal
            footer={null}
            width={600}
            title={`Sell Product (${product.name})`}
            open={isShowModal}
            onCancel={() => setIsShowModal(false)}
            onClose={() => setIsShowModal(false)}
        >
            <Divider />
            <SellProductForm
                loading={createOrderLoading}
                handleSubmitForm={handleCreateOrder}
                handleCancelForm={() => setIsShowModal(false)}
                product={product}
            />
        </Modal>
    );
};

export default SellProductModal;
