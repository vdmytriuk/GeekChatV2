import {FC, useState} from "react";

import Edit from "../../shared/assets/svg/edit.svg";
import Light from "../../shared/assets/svg/todo.svg"
import Delete from "../../shared/assets/svg/delete.svg";

import {IRoom} from "../../shared/common/types";

import "./Room.scss";

interface IRoomProps extends IRoom {
    setPopupId: any;
    popupId: string;
}

const Room: FC<IRoomProps> = ({name, _id, setPopupId, popupId}) => {
    const [isEditing, setIsEditing] = useState(false);

    const setQuery = () => {
        const params = new URLSearchParams();

        params.append('roomId', _id + '');

        const url = new URL(window.location.href);

        url.search = params.toString();
        window.history.replaceState({}, '', url);
    }

    return (
        <div
            className="room"
            onClick={setQuery}
        >
            <p className="medium-text">
                {name}
            </p>

            <div
                className={`room__control ${popupId === _id ? 'active' : ''}`}
                onClick={() => setPopupId(_id)}
            >
                <Edit/>

                <div className="room__popup">
                    <div className="room__item">
                        <Light/>

                        <p className="caption-text light-text">
                            Edit
                        </p>
                    </div>

                    <div className="room__item">
                        <Delete/>

                        <p className="caption-text light-text">
                            Delete
                        </p>
                    </div>

                    <div className={`room__edit ${isEditing ? 'active' : ''}`}>

                    </div>
                </div>
            </div>

            <div
                className={`room__overlay ${popupId === _id  ? 'active' : ''}`}
                onClick={() => setPopupId(null)}
            />
        </div>
    );
};

export default Room;