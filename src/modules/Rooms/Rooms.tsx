import {FC, FormEvent, useEffect, useState} from "react";
import {useTypedDispatch} from "../../shared/hooks/useTypedDispatch";
import {useTypedSelector} from "../../shared/hooks/useTypedSelector";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {IRoomEditData} from "./types";
import {editRoomSchema} from "./schema/schema";

import {authUserRequest} from "../AuthForm/api";
import {getPublicRoomsRequest} from "./api";

import Nav from "../../shared/UI/Nav/Nav";
import Room from "../../components/Room/Room";

import "./Rooms.scss";
import {editUserRequest} from "./api/editRoomRequest";
import {getMyRoomsRequest} from "./api/getMyRoomsRequest";


const Rooms: FC = () => {
    const dispatch = useTypedDispatch();

    const navItems = ["My rooms", "Public rooms"];

    const [roomPopupId, setRoomPopupId] = useState(null);
    const [activeRoomType, setActiveRoomType] = useState(navItems[0]);

    const publicRooms = useTypedSelector(state => state.rooms.publicRooms);
    const myRooms = useTypedSelector(state => state.rooms.myRooms);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            dirtyFields
        }
    } = useForm<IRoomEditData>(
        {
            mode: 'onChange',
            resolver: yupResolver(editRoomSchema)
        }
    );

    const onSubmit: (data: IRoomEditData, e: FormEvent<HTMLFormElement>, id: string) => void = (data, e: FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();

        dispatch(editUserRequest(dispatch, id, data));
    }

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
                                    handleSubmit={handleSubmit}
                                    onSubmit={onSubmit}
                                    register={register}
                                    errors={errors}
                                    dirtyFields={dirtyFields}
                                    setPopupId={setRoomPopupId}
                                    popupId={roomPopupId}
                                    ownRoom
                                    {...room}
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