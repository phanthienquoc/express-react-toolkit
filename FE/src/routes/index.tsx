import React from "react";
import SignIn from "../component/SignIn";
import SignUp from "../component/SignUp";
import ErrorBoundary from "../component/ErrorBoundary";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = (props: any) => {
    console.log("AppRoutes")
    return (
        <Router>
            <Routes>
                <Route path={"/auth"}>
                    <Route
                        path={"signin"}
                        element={<SignIn />}
                        loader={async ({ params }) => params}
                        action={async ({ request }) => request}
                        errorElement={<ErrorBoundary />} />
                    <Route path={"signup"} element={<SignUp />} />
                </Route>
                <Route path={"/"}>
                    <Route path={"home"}></Route>
                    <Route path={"user"}>
                        <Route path={":id"} element={<SignIn />} />
                    </Route>
                    <Route path={"device"}></Route>
                    <Route path={"cronjob"}></Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;