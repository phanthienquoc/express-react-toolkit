import React from "react";

import Box from "../../core/Box";
import Table from '../../core/Table';
import QUERY_KEYS from "../../constants/QueryKey";

import { useAppSelector } from "../../store/hooks";
import { useGetAllQuery } from "../../services/connectedDevice";

const ConnectedDevices = (props: any) => {
    const { loading, user } = useAppSelector((state: any) => state.auth)
    const { data, error, isLoading } = useGetAllQuery(QUERY_KEYS.CONNECTED_DEVICES.reducerPath);
    console.log(user)

    const columns: readonly any[] = [
        {
            id: 'id',
            label: 'device id',
            minWidth: 100
        },
        {

            id: 'qr_code_id',
            label: 'qr_code_id',
            minWidth: 170,
            format: (value: number) => value,
        },
        {
            id: 'device_name',
            label: 'device_name',
            minWidth: 170
        },
        {
            id: 'disabled',
            label: 'state',
            minWidth: 170,
            format: (value: string) => value,
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

export default ConnectedDevices;
