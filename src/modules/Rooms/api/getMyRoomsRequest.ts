import $host from "../../../shared/http/host";

import {baseRequest} from "../../../shared/common/base/baseRequest";

import {IRoom} from "../../../shared/common/types";

import { roomsActions } from "../store";
import { AppDispatch } from "../../../store/store";

export const getMyRoomsRequest = (dispatch: AppDispatch) => {
    return baseRequest<IRoom[]>(async () => {
        const resp = await $host.get<IRoom[]>('/rooms/own');
        const rooms = resp?.data;

        dispatch(roomsActions.setMyRooms(rooms));

        return rooms;
    });
}