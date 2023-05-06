import {FC, ReactNode} from "react";

import "./BorderedBox.scss";

interface IBorderedBoxProps {
    children: ReactNode | ReactNode[]
}

const BorderedBox: FC<IBorderedBoxProps> = ({children}) => {
    return (
        <div className="bordered-box">
            {children}
        </div>
    );
};

export default BorderedBox;