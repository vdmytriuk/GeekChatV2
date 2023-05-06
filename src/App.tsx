import {FC, useEffect} from "react";
import {useTypedDispatch} from "./hooks/useTypedDispatch";
import {useTypedSelector} from "./hooks/useTypedSelector";

import {appActions} from "./store/app";
import {setUserProfile} from "./store/user/operation";

import AppNotification from "./components/AppNotification/AppNotification";
import AppLoadingScreen from "./components/AppLoadingScreen/AppLoadingScreen";

import AppRouter from "./core/AppRouter/AppRouter";


const App: FC = () => {
    const dispatch = useTypedDispatch();
    const isAppLoaded = useTypedSelector(state => state.app.isInitialAppLoaded);

    useEffect(() => {
        dispatch(setUserProfile(dispatch))
            .then(() => dispatch(appActions.setIsInitialAppLoaded()));
    }, []);

    return (
        isAppLoaded &&

        <>
            <AppNotification/>

            <AppLoadingScreen/>

            <AppRouter/>
        </>
    )
};

export default App;