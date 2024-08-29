import { ICreateOrderRequestPayload } from '@/app/interfaces/request/order.request';
import { IProductsListData } from '@/app/interfaces/response/productsList.response';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';

const SellProductForm = ({
    product,
    handleCancelForm,
    handleSubmitForm,
    loading,
}: {
    product: IProductsListData;
    handleCancelForm: () => void;
    handleSubmitForm: (values: ICreateOrderRequestPayload) => void;
    loading?: boolean;
}) => {
    const [quantity, setQuantity] = useState<number>(1);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value));
    };

    return (
        <div>
            <Form
                name="basic"
                initialValues={{ quantity: 1 }}
                onFinish={handleSubmitForm}
                onFinishFailed={(error) => console.log(error, 'error on submit form!')}
                autoComplete="off"
            >
                <label>Email</label>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input size="large" />
                </Form.Item>
                <label>Quantity</label>
                <Form.Item
                    name="quantity"
                    rules={[
                        { required: true, message: 'Please input your Quantity!' },
                        {
                            validator: (_, value) => {
                                if (value && value > product.stock) {
                                    return Promise.reject(
                                        new Error(
                                            `${product.stock} quantity available only of this product!`
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input onChange={handleQuantityChange} type="number" min={1} size="large" />
                </Form.Item>
                <div className="flex justify-end gap-x-3">
                    <Button
                        onClick={() => handleCancelForm()}
                        size="large"
                        className=" bg-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        loading={loading}
                        disabled={!quantity}
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        Pay {quantity > 0 && `${quantity * product.price}$`}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SellProductForm;
