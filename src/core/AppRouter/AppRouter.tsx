import {FC} from "react";
import {Navigate, Route, Routes} from "react-router";

import {ROUTER} from "../../shared/common/config/router";

import PublicRoute from "../PublicRoute/PublicRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import WelcomePage from "../../pages/WelcomePage/WelcomePage";
import HomePage from "../../pages/HomePage/HomePage";
import AuthPage from "../../pages/AuthPage/AuthPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";


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
                path={ROUTER.REGISTRATION}
                element={
                    <PublicRoute>
                        <RegisterPage/>
                    </PublicRoute>
                }
            />

            <Route
                path={ROUTER.FORGOT_PASSWORD}
                element={
                    <PublicRoute>
                        <ForgotPasswordPage/>
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

            <Route
                path={ROUTER.ANY}
                element={<Navigate to={ROUTER.WELCOME}/>}
            />
        </Routes>
    );
};

export default AppRouter;