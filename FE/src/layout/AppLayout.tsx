import React, { useEffect } from "react";

import "../App.css"

import Box from "../core/Box";
import Image from '../core/Image';

import { isEmpty, get } from 'lodash';
import { useAppSelector } from "../store/hooks";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Aside from "../component/Aside";

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
        <React.Fragment>
            <Box component={"header"}>
                <Image src={"/"} />
            </Box>
            <Box component={"main"}>
                <Aside />
                <Box component={"section"}>
                    <Outlet />
                </Box>
            </Box>
            <Box component={"footer"}>
            </Box>
        </React.Fragment>
    );
};

export default AppLayout;
