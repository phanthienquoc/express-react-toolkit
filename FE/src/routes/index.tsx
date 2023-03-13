import React, { useEffect } from "react";

import RouteConfig from "./config";
import { useRoutes } from "react-router-dom";

const AppRoutes = () => useRoutes(RouteConfig);

export default AppRoutes;