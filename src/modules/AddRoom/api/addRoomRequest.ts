import $host from "../../../shared/http/host";

import {AppDispatch} from "../../../store/store";
import {IRoomAddData} from "../types";

import {baseRequest} from "../../../shared/common/base/baseRequest";
import {getMyRoomsRequest} from "../../Rooms";

export const addRoomRequest = (dispatch: AppDispatch, {name, description}: IRoomAddData) => {
    return baseRequest<any>(async () => {
        const resp = await $host.post(`/rooms`, {name, description});

        dispatch(getMyRoomsRequest(dispatch));
    }, { title: "Done!", text: "Room created!" });
}