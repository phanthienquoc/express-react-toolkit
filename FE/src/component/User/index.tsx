import React from 'react';
import Box from '../../core/Box';
import { useAppSelector } from '../../store/hooks';
import { useGetUserQuery } from '../../services/user'
import ReactVirtualizedTable from '../../core/Table/DemoTable';

const User = (props: any) => {
    const { loading, users } = useAppSelector((state: any) => state.user);
    const { data, error, isLoading } = useGetUserQuery(`users`);
    return (
        <Box>
            <Box>
                {loading}
            </Box>
            {
                JSON.stringify(data)
            }
            <Box>
                <ReactVirtualizedTable />
            </Box>
        </Box>
    )
}

export default User