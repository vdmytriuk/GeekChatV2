import {FC} from "react";

import Rooms from "../../modules/Rooms/Rooms";
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
                <aside className="private-layout__aside">
                    <Rooms/>
                </aside>

                <section className="private-layout__inner">
                    {children}
                </section>
            </main>
        </>
    );
};

export default PrivateLayout;