import {FC} from "react";

import PrivateHeader from "../PrivateHeader/PrivateHeader";

import "./PrivateLayout.scss";

interface IPrivateLayout {
    children: JSX.Element;
}

const PrivateLayout: FC<IPrivateLayout> = ({children}) => {
    return (
        <>
            <PrivateHeader/>

            <main className="private-layout">
                <aside className="private-layout__toolbar">

                </aside>

                <div className="private-layout__inner">
                    <div className="private-layout__header">

                    </div>

                    <div className="private-layout__main">
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
};

export default PrivateLayout;