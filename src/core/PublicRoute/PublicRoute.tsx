import {FC} from "react";
import {Navigate} from "react-router";

import {useTypedSelector} from "../../hooks/useTypedSelector";

import {ROUTER} from "../../common/config/router";
import {PublicLayout} from "../../layouts/PublicLayout";

interface IPublicRoute {
    children: JSX.Element;
}

const PublicRoute:FC<IPublicRoute> = ({children}) => {
    const isAuth = useTypedSelector(state => state.user.isAuth);

    if (!isAuth) {
        return <PublicLayout>{children}</PublicLayout>
    }

    return <Navigate to={ROUTER.HOME}/>;
};

export default PublicRoute;