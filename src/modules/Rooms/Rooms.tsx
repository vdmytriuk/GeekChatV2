import {FC, useEffect, useState} from "react";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";

import {getPublicRoomsRequest, getMyRoomsRequest} from "./api";

import Nav from "../../shared/UI/Nav/Nav";
import Room from "../Room/Room";

import "./Rooms.scss";


const Rooms: FC = () => {
    const dispatch = useTypedDispatch();

    const navItems = ["My rooms", "Public rooms"];

    const [roomPopupId, setRoomPopupId] = useState<string>("");
    const [activeRoomType, setActiveRoomType] = useState(navItems[0]);

    const myRooms = useTypedSelector(state => state.rooms.myRooms);
    const publicRooms = useTypedSelector(state => state.rooms.publicRooms);

    useEffect(() => {
        dispatch(getPublicRoomsRequest(dispatch));
        dispatch(getMyRoomsRequest(dispatch));
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
                        {myRooms.map(room => (
                            <li key={room._id}>
                                <Room
                                    setPopupId={setRoomPopupId}
                                    popupId={roomPopupId}
                                    _id={room._id}
                                    ownRoom
                                    name={room.name}
                                    description={room.description}
                                />
                            </li>
                        ))}
                    </ul>
                    :
                    <ul className="rooms__list">
                        {publicRooms.map(room => (
                            <li key={room._id}>
                                <Room
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