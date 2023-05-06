import {FC} from "react";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";

import Logo from "../../shared/assets/svg/logo.svg";

import "./AppLoadingScreen.scss"

const AppLoadingScreen: FC = () => {
    const isAppLoading = useTypedSelector(state => state.app.isAppLoading);

    return (
        <div className={`app-loading-screen ${isAppLoading ? 'active' : ''}`}>
            <Logo/>
        </div>
    );
};

export default AppLoadingScreen;