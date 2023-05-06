import {FC, ReactNode} from "react";

import "./LogoWrapper.scss";

import Logo from "../../shared/assets/svg/logo.svg";

interface ILogoWrapperProps {
    className: string;
    children: ReactNode | ReactNode[];
}

const LogoWrapper: FC<ILogoWrapperProps> = ({className, children}) => {
    return (
        <div className={`${className} logo-wrapper`}>
            <Logo/>

            {children}
        </div>
    );
};

export default LogoWrapper;