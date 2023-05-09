import $host from "../../../shared/http/host";

import {AppDispatch} from "../../../store/store";

import {IRoomEditData} from "../types";

import {baseRequest} from "../../../shared/common/base/baseRequest";
import {getMyRoomsRequest} from "../../Rooms";

export const editRoomRequest = (dispatch: AppDispatch, id: string, {name, description}: IRoomEditData) => {
    return baseRequest<any>(async () => {
        const resp = await $host.patch(`/rooms/${id}`, {name, description});

        dispatch(getMyRoomsRequest(dispatch));
    }, { title: "Done!", text: "Room edited!" });
}