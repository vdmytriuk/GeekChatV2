import {FC} from "react";
import {Route, Routes} from "react-router";

import {ROUTER} from "../../common/config/router";

import PublicRoute from "../PublicRoute/PublicRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


const AppRouter: FC = () => {
    return (
        <Routes>
            <Route
                index
                path={ROUTER.WELCOME}
                element={
                    <PublicRoute>
                        <span></span>
                    </PublicRoute>
                }
            />

            <Route
                path={ROUTER.HOME}
                element={
                    <PrivateRoute>
                        <span></span>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default AppRouter;