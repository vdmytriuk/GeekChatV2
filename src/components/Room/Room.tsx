import {FC} from "react";

import Edit from "../../shared/assets/svg/edit.svg";

import {IRoom} from "../../shared/common/types";

import "./Room.scss";

const Room: FC<IRoom> = ({name}) => {
    return (
        <div className="room">
            <p className="medium-text">
                {name}
            </p>

            <button className="room__control hover-shadow">
                <Edit/>
            </button>
        </div>
    );
};

export default Room;