import {FC} from "react";
import {useNavigate} from "react-router";

import {ROUTER} from "../../shared/common/config/router";

import Button from "../../shared/UI/Button/Button";
import LogoWrapper from "../../components/LogoWrapper/LogoWrapper";

import "./ChooseBlock.scss";

const ChooseBlock: FC = () => {
    const navigate = useNavigate();

    return (
        <LogoWrapper className="choose-block">
            <h3 className="medium-heading light-text">
                Are you here for the first time or do you have an account?
            </h3>

            <div className="choose-block__buttons">
                <Button onClick={() => navigate(ROUTER.AUTH)}>
                    Log in
                </Button>

                <Button onClick={() => navigate(ROUTER.REGISTRATION)}>
                    Sign up
                </Button>
            </div>
        </LogoWrapper>
    );
};

export default ChooseBlock;