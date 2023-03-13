import React from "react";
import QUERY_KEYS from "../../constants/QueryKey";

import Box from "../../core/Box";
import Table from '../../core/Table';

import { useGetAllQuery } from "../../services/qr";

const QRCode = (props: any) => {
    const { data, error, isLoading: loading } = useGetAllQuery(QUERY_KEYS.QR_CODE.pathName);

    const columns: readonly any[] = [
        {
            id: 'id',
            label: 'id',
            minWidth: 100
        },
        {
            id: 'user_id',
            label: 'User',
            minWidth: 170,
            format: (value: number) => value,
        },
        {
            id: 'is_active',
            label: 'Active',
            minWidth: 170,
        },
        {
            id: 'last_used_date',
            label: 'Last Used',
            minWidth: 170,
            format: (value: number) => value.toLocaleString('en-US'),
        },

    ];
    return (
        <Box>
            <Box>{loading}</Box>
            <Box>
                <Table data={data} columns={columns} />
            </Box>
        </Box>
    );
};

export default QRCode;
