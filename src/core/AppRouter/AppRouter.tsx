import {FC} from "react";
import {Route, Routes} from "react-router";

import {ROUTER} from "../../shared/common/config/router";

import PublicRoute from "../PublicRoute/PublicRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import WelcomePage from "../../pages/WelcomePage/WelcomePage";
import HomePage from "../../pages/HomePage/HomePage";
import AuthPage from "../../pages/AuthPage/AuthPage";


const AppRouter: FC = () => {
    return (
        <Routes>
            <Route
                index
                path={ROUTER.WELCOME}
                element={
                    <PublicRoute>
                        <WelcomePage/>
                    </PublicRoute>
                }
            />

            <Route
                path={ROUTER.AUTH}
                element={
                    <PublicRoute>
                        <AuthPage/>
                    </PublicRoute>
                }
            />

            <Route
                path={ROUTER.HOME}
                element={
                    <PrivateRoute>
                        <HomePage/>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default AppRouter;