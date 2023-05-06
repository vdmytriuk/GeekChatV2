import React, {FC} from "react";
import {Link} from "react-router-dom";

import {ROUTER} from "../../common/config/router";

import Logo from "../../assets/svg/logo.svg";

import "./PrivateHeader.scss";

const PrivateHeader: FC = () => {

    return (
        <header className="private-header">
            <Link to={ROUTER.HOME}>
                <Logo/>
            </Link>
        </header>
    );
};

export default PrivateHeader;