import { FormType } from '@/app/enums/formType';
import { IProductRequestPayload } from '@/app/interfaces/request/product.request';
import { IProductsListData } from '@/app/interfaces/response/productsList.response';
import { Button, Flex, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const ProductForm = ({
    handleSubmitForm,
    loading,
    handleCloseForm,
    initialProduct,
    formType,
}: {
    handleSubmitForm: (values: IProductRequestPayload) => void;
    loading?: boolean;
    handleCloseForm: () => void;
    initialProduct?: IProductsListData;
    formType?: FormType;
}) => {
    return (
        <Form
            initialValues={initialProduct}
            name="basic"
            onFinish={handleSubmitForm}
            onFinishFailed={(error) => console.log(error, 'error on submit form!')}
            autoComplete="off"
        >
            <label>Name</label>
            <Form.Item name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
                <Input size="large" />
            </Form.Item>
            <label>Description</label>

            <Form.Item
                name="description"
                rules={[{ required: true, message: 'Please input your Description!' }]}
            >
                <TextArea rows={6} />
            </Form.Item>
            <label>Price</label>

            <Form.Item
                name="price"
                rules={[
                    { required: true, message: 'Please input your Price!' },
                    {
                        validator: (_, value) => {
                            if (value && value <= 0) {
                                return Promise.reject(
                                    new Error('Price must be at greater than 0!')
                                );
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Input type="number" size="large" />
            </Form.Item>
            {(!formType || (formType && formType !== FormType.UPDATE)) && (
                <>
                    <label>Stock</label>

                    <Form.Item
                        name="stock"
                        rules={[
                            { required: true, message: 'Please input your Stock!' },
                            {
                                validator: (_, value) => {
                                    if (value && value <= 0) {
                                        return Promise.reject(
                                            new Error('Stock must be at greater than 0!')
                                        );
                                    } else if (value > 1000) {
                                        return Promise.reject(
                                            new Error('Stock not be more than 1000!')
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input type="number" size="large" />
                    </Form.Item>
                </>
            )}
            <Flex gap={8} justify="end">
                <Button size="large" className=" bg-gray-300" onClick={() => handleCloseForm()}>
                    Cancel
                </Button>
                <Button loading={loading} size="large" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Flex>
        </Form>
    );
};

export default ProductForm;
