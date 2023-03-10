import React from "react";

import Box from "../../core/Box";
import Table from '../../core/Table';

import { useAppSelector } from "../../store/hooks";
import { useGetAllQuery } from "../../services/user";

const User = (props: any) => {
    const { loading, users } = useAppSelector((state: any) => state.user);
    const { data, error, isLoading } = useGetAllQuery(`users`);

    const columns: readonly any[] = [
        {
            id: 'id',
            label: 'id',
            minWidth: 100
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 170
        },
        {
            id: 'first_name',
            label: 'Population',
            minWidth: 170,
            format: (value: number) => value.toLocaleString('en-US'),
        },
        {
            id: 'last_name',
            label: 'Size\u00a0(km\u00b2)',
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

export default User;
