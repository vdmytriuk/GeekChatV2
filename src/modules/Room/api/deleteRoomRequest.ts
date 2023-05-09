import $host from "../../../shared/http/host";

import {AppDispatch} from "../../../store/store";

import {baseRequest} from "../../../shared/common/base/baseRequest";
import {getMyRoomsRequest} from "../../Rooms";

export const deleteRoomRequest = (dispatch: AppDispatch, id: string) => {
    return baseRequest<any>(async () => {
        const resp = await $host.delete(`/rooms/${id}`);

        dispatch(getMyRoomsRequest(dispatch));
    }, { title: "Done!", text: "Room deleted!" });
}