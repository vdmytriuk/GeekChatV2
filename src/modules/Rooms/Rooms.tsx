import {FC, useEffect, useState} from "react";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";

import {getPublicRoomsRequest} from "./api";

import Nav from "../../shared/UI/Nav/Nav";

import "./Rooms.scss";
import Room from "../../components/Room/Room";

const Rooms: FC = () => {
    const dispatch = useTypedDispatch();

    const navItems = ["My rooms", "Public rooms"];
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

            {activeRoomType === navItems[0]
                ?
                <ul className="rooms__list">

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
    );
};

export default Rooms;