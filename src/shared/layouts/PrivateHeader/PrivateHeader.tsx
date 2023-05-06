import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";

import {ROUTER} from "../../common/config/router";

import Logo from "../../assets/svg/logo.svg";

import DefaultUserAvatar from "../../UI/DefaultUserAvatar/DefaultUserAvatar";

import "./PrivateHeader.scss";

const PrivateHeader: FC = () => {
    const {username} = useTypedSelector(state => state.user)

    return (
        <header className="private-header">
            <Link to={ROUTER.HOME}>
                <Logo/>
            </Link>

            <DefaultUserAvatar username={username}/>
        </header>
    );
};

export default PrivateHeader;