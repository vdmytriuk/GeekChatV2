import {FC, useEffect, useState} from "react";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";

import {getPublicRoomsRequest} from "./api";

import Nav from "../../shared/UI/Nav/Nav";
import Room from "../../components/Room/Room";

import "./Rooms.scss";

const Rooms: FC = () => {
    const dispatch = useTypedDispatch();

    const navItems = ["My rooms", "Public rooms"];

    const [roomPopupId, setRoomPopupId] = useState(null);
    const [activeRoomType, setActiveRoomType] = useState(navItems[0]);

    const publicRooms = useTypedSelector(state => state.rooms.publicRooms);

    useEffect(() => {
        dispatch(getPublicRoomsRequest(dispatch));
    }, [])

    return (
        <div className="rooms">
            <div className="rooms__header">
                <Nav navItems={navItems} onClick={(text: any) => setActiveRoomType(text)}/>
            </div>

            <div className="rooms__content">
                {activeRoomType === navItems[0]
                    ?
                    <ul className="rooms__list">

                    </ul>
                    :
                    <ul className="rooms__list">
                        {publicRooms.map(room => (
                            <li key={room._id}>
                                <Room
                                    setPopupId={setRoomPopupId}
                                    popupId={roomPopupId}
                                    {...room}
                                />
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
};

export default Rooms;