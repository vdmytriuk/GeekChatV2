import {ReactNode} from "react";

import PublicHeader from "../PublicHeader/PublicHeader";
import BorderedBox from "../../../components/BorderedBox/BorderedBox";

import './PublicLayout.scss';

const PublicLayout = ({children}: {
    children: ReactNode | ReactNode[]
}) => {
    return (
        <>
            <PublicHeader/>

            <main className="public-layout">
                <BorderedBox>
                    {children}
                </BorderedBox>
            </main>
        </>
    );
};

export default PublicLayout;