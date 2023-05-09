import React, {FC, useState} from "react";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";

import {ROUTER} from "../../shared/common/config/router";

import Logo from "../../shared/assets/svg/logo.svg";
import Setting from "../../shared/assets/svg/setting.svg";
import Logout from "../../shared/assets/svg/logout.svg";

import {appActions} from "../../store/app";
import {userActions} from "../../store/user";

import DefaultUserAvatar from "../../shared/UI/DefaultUserAvatar/DefaultUserAvatar";

import "./PrivateHeader.scss";

interface IPrivateHeaderProps {
    setProfileOpen: () => void;
}

const PrivateHeader: FC<IPrivateHeaderProps> = ({setProfileOpen}) => {
    const dispatch = useTypedDispatch();

    const {username} = useTypedSelector(state => state.user);

    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <header className="private-header">
            <Link to={ROUTER.HOME}>
                <Logo/>
            </Link>


            <div className="private-header__avatar">
                <DefaultUserAvatar onClick={() => setPopupOpen(true)} username={username}/>

                <div className={`private-header__control ${popupOpen ? 'active' : ''}`}>
                    <div className="private-header__popup">
                        <div
                            onClick={() => {
                                setPopupOpen(false)
                                setProfileOpen()
                            }}
                            className="private-header__item"
                        >
                            <Setting/>

                            <p className="caption-text light-text">
                                Settings
                            </p>
                        </div>

                        <div onClick={() => {
                            dispatch(appActions.setAppNotification({title: "Done!", text: "You are logged out"}))
                            dispatch(userActions.logout())
                        }}
                             className="private-header__item"
                        >
                            <Logout/>

                            <p className="caption-text">
                                Logout
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className={`private-header__overlay ${popupOpen  ? 'active' : ''}`}
                    onClick={() => setPopupOpen(false)}
                />
            </div>
        </header>
    );
};

export default PrivateHeader;