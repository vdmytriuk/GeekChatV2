import {FC, ReactNode} from "react";

import "./AppContainer.scss";

interface AppContainerProps {
    children: ReactNode
}

const AppContainer: FC<AppContainerProps> = ({children}) => {
    return (
        <div className="app-container">
            {children}
        </div>
    );
};

export default AppContainer;