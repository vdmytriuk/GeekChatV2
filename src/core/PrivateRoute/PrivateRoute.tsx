import {FC} from "react";
import {Navigate} from "react-router";

import {useTypedSelector} from "../../shared/hooks/useTypedSelector";

import {ROUTER} from "../../shared/common/config/router";

import PrivateLayout from "../../layouts/PrivateLayout/PrivateLayout";

interface IPrivateRoute {
    children: JSX.Element;
}

const PrivateRoute:FC<IPrivateRoute> = ({children}) => {
    const isAuth = useTypedSelector(state => state.user.isAuth);

    if (isAuth) {
        return <PrivateLayout>{children}</PrivateLayout>
    }

    return <Navigate to={ROUTER.AUTH}/>;
};

export default PrivateRoute;