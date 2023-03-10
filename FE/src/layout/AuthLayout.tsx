import React from "react";
import Box from "../core/Box";
import Image from '../core/Image';
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { browserName, osName, osVersion, OsTypes } from 'react-device-detect';

const AuthLayout = (props: any) => {
  const { loading, user, access_token, error, success } = useAppSelector((state: any) => state.auth);
  console.log("AuthLayout", browserName, osName, osVersion)
  return (
    <Box component={"main"}>
      <Box component={"header"}>
        <Image src={"/"} />
      </Box>
      <Box component={"main"}>
        <Box component={"aside"}>
          {osVersion}
          {browserName}
          {osName}
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

export default AuthLayout;
