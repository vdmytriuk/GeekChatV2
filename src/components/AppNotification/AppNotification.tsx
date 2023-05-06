import {FC, useEffect} from "react";

import {useTypedSelector} from "../../shared/hooks/useTypedSelector";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";

import {appActions} from "../../store/app";

import Close from "../../shared/assets/svg/close.svg";

import "./AppNotification.scss";

const AppNotification: FC = () => {
    const dispatch = useTypedDispatch();

    const title = useTypedSelector(state => state.app.appNotificationTitle);
    const text = useTypedSelector(state => state.app.appNotificationText);
    const isVisible = useTypedSelector(state => state.app.appNotificationVisible);

    useEffect(() => {
        setTimeout(() => {
            dispatch(appActions.resetAppNotification())
        }, 3000)
    }, [isVisible])

    return isVisible && (
        <div className="app-notification">
            <button
                className="app-notification__close"
                onClick={() => dispatch(appActions.resetAppNotification())}
            >
                <Close/>
            </button>

            <h3 className="medium-title">
                {title}
            </h3>

            <p>
                {text}
            </p>
        </div>
    );
};

export default AppNotification;