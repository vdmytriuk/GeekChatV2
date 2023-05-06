import $host from "../../../shared/http/host";

import {baseRequest} from "../../../shared/common/base/baseRequest";

import {IRoom} from "../../../shared/common/types";

import { roomsActions } from "../store";
import { AppDispatch } from "../../../store/store";

export const getPublicRoomsRequest = (dispatch: AppDispatch) => {
    return baseRequest<IRoom[]>(async () => {
        const resp = await $host.get<IRoom[]>('/rooms');
        const rooms = resp?.data;

        dispatch(roomsActions.setPublicRooms(rooms));

        return rooms;
    });
}