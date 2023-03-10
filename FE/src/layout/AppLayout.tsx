import React, { useEffect } from "react";

import Box from "../core/Box";
import Image from '../core/Image';

import { isEmpty, get } from 'lodash';
import { useAppSelector } from "../store/hooks";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AppLayout = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation()
    const { loading, user, error, success } = useAppSelector((state: any) => state.auth);

    useEffect(() => {
        if (isEmpty(get(user, "access_token"))) {
            navigate("/auth/signin");
        }
    }, [location.pathname])

    return (
        <Box component={"main"}>
            <Box component={"header"}>
                <Image src={"/"} />
            </Box>
            <Box component={"main"}>
                <Box component={"aside"}>
                </Box>
                <Box component={"section"}>
                    <Box component={"article"}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
            <Box component={"footer"}>
            </Box>
        </Box>
    );
};

export default AppLayout;
