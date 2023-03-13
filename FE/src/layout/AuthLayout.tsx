import React from "react";
import Box from "../core/Box";
import Image from '../core/Image';

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <React.Fragment>
      <Box component={"header"}>
        <Image src={"/"} />
      </Box>
      <Box component={"main"}>
        <Box component={"aside"}>

        </Box>
        <Box component={"section"}>
          <Outlet />
        </Box>
      </Box>
      <Box component={"footer"}>
      </Box>
    </React.Fragment>
  );
};

export default AuthLayout;
