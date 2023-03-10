import React, { useEffect } from "react";

import Home from '../component/Home';
import User from "../component/User";
import SignIn from "../component/SignIn";
import SignUp from "../component/SignUp";
import AppLayout from '../layout/AppLayout';
import AuthLayout from '../layout/AuthLayout';
import ErrorBoundary from "../component/ErrorBoundary";

import { useAppSelector } from "../store/hooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = (props: any) => {
    const { loading, user, error, success } = useAppSelector((state: any) => state.auth);

    return (
        <Router>
            <Routes>
                <Route path={"/auth"} element={<AuthLayout />} >
                    <Route
                        path={"signin"}
                        element={<SignIn />}
                        loader={async ({ params }) => params}
                        action={async ({ request }) => request}
                        errorElement={<ErrorBoundary />} />
                    <Route path={"signup"} element={<SignUp />} />
                </Route>
                <Route path={"/"} element={<AppLayout />} >
                    <Route index element={<Home />} />
                    <Route path={"user"}>
                        <Route index element={<User />} />
                        <Route path={":id"} element={<SignIn />} />
                    </Route>
                    <Route path={"device"}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path={"cronjob"}>
                        <Route index element={<Home />} />
                    </Route>
                </Route>
            </Routes>
        </Router >
    )
}

export default AppRoutes;