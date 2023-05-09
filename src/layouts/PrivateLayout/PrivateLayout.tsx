import {FC, useState} from "react";

import UserProfile from "../../modules/UserProfile/UserProfile";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import PrivateHeader from "../PrivateHeader/PrivateHeader";

import "./PrivateLayout.scss";

interface IPrivateLayout {
    children: JSX.Element | JSX.Element[];
    aside?: JSX.Element;
}

const PrivateLayout: FC<IPrivateLayout> = ({aside, children}) => {
    const [profileVisible, setProfileVisible] = useState(false);

    return (
        <>
            <PrivateHeader setProfileOpen={() => setProfileVisible(true)}/>

            <main className="private-layout">
                <aside className="private-layout__aside">
                    {aside}
                </aside>

                <section className="private-layout__inner">
                    {children}
                </section>

                <ModalWindow
                    isOpen={profileVisible}
                    onClose={() => setProfileVisible(false)}
                >
                    <UserProfile/>
                </ModalWindow>
            </main>
        </>
    );
};

export default PrivateLayout;