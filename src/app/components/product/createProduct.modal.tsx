import React, { useState } from 'react';
import ProductForm from './form';
import { Divider, Modal, notification } from 'antd';
import { StatusCodes } from 'http-status-codes';
import { IBaseResponse } from '@/app/interfaces/response/baseResponse';
import { IProductRequestPayload } from '@/app/interfaces/request/product.request';
type CreateProductModalProps = {
    isShowModal: boolean;
    setIsShowModal: (value: boolean) => void;
    title?: string;
    refetchProducts: () => void;
};

const CreateProductModal = ({
    isShowModal,
    setIsShowModal,
    title,
    refetchProducts,
}: CreateProductModalProps) => {
    const [createProductLoading, setCreateProductLoading] = useState<boolean>(false);

    const handleCreateProduct = async (values: IProductRequestPayload) => {
        setCreateProductLoading(true);

        try {
            const response = await fetch('api/products', {
                method: 'POST',
                body: JSON.stringify(values),
            });
            const responseJSON: IBaseResponse = await response.json();

            if (responseJSON.status === StatusCodes.OK) {
                notification.success({ message: 'Success!', type: 'success' });

                refetchProducts();
                setIsShowModal(false);
            } else {
                notification.error({ message: responseJSON.message, type: 'error' });
            }
        } catch (error) {
            console.log(error, 'error');
        } finally {
            setCreateProductLoading(false);
        }
    };

    return (
        <Modal
            footer={null}
            width={600}
            title={title ?? 'Create Product'}
            open={isShowModal}
            onCancel={() => setIsShowModal(false)}
            onClose={() => setIsShowModal(false)}
        >
            <Divider />
            <ProductForm
                handleCloseForm={() => setIsShowModal(false)}
                loading={createProductLoading}
                handleSubmitForm={handleCreateProduct}
            />
        </Modal>
    );
};

export default CreateProductModal;
