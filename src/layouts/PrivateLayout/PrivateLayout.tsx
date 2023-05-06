import {FC} from "react";

import "./PrivateLayout.scss";

interface IPrivateLayout {
    children: JSX.Element;
}

const PrivateLayout: FC<IPrivateLayout> = ({children}) => {
    return (
        <section className="private-layout">
            <aside className="private-layout__toolbar">

            </aside>

            <div className="private-layout__inner">
                <div className="private-layout__header">

                </div>

                <div className="private-layout__main">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default PrivateLayout;