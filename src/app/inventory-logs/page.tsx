'use client';
import Container from '@/app/components/shared/container';
import { InventorySubmitType } from '@/app/enums/inventorySubmitType';
import { IBaseResponse } from '@/app/interfaces/response/baseResponse';
import {
    IProductLogsData,
    IProductLogsResponse,
} from '@/app/interfaces/response/productLogs.response';
import { Divider, Table, Tag, notification } from 'antd';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect, useState } from 'react';

const ProductLogs = () => {
    const [logsList, setLogsList] = useState<IProductLogsData[]>([]);
    const [logsLoading, setLogsLoading] = useState<boolean>(false);

    const columns = [
        {
            title: 'Product name',
            dataIndex: 'name',
            key: 'name',
            render: (row: any, data: IProductLogsData) => <p>{data.productId.name}</p>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (row: any, { type, _id }: IProductLogsData) => {
                let color = 'green';
                if (type === InventorySubmitType.SUBTRACT) color = 'red';
                return (
                    <Tag color={color} key={_id}>
                        {type.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (row: any, data: IProductLogsData) => <p>{`$${data.productId.price}`}</p>,
        },
        {
            title: 'Stocks Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Total In Stock',
            dataIndex: 'totalStockCount',
            key: 'totalStockCount',
        },
    ];

    const getProductLogs = async () => {
        setLogsLoading(true);
        try {
            let response = await fetch(`/api/all-logs`);
            let responseJSON: IProductLogsResponse = await response.json();
            if (responseJSON.status === StatusCodes.OK) setLogsList(responseJSON.data);
            else notification.error({ message: responseJSON.message, type: 'error' });
        } catch (error) {
            console.log(error, 'error');
        }
        setLogsLoading(false);
    };

    useEffect(() => {
        getProductLogs();
    }, []);

    return (
        <Container>
            <div className="mb-6">
                <div className="flex justify-between">
                    <h1 className="text-xl font-medium">Inventory Logs</h1>
                </div>
                <Divider />
                <br />
                <Table
                    scroll={{ x: 800 }}
                    pagination={false}
                    dataSource={logsList}
                    columns={columns}
                    loading={logsLoading}
                />
            </div>
        </Container>
    );
};

export default ProductLogs;
