import $host from "../../../shared/http/host";

import {baseRequest} from "../../../shared/common/base/baseRequest";

import {IMessage, IRoom} from "../../../shared/common/types";

import {chatRoomActions} from "../store";
import { AppDispatch } from "../../../store/store";

export const getChatRoomRequest = (dispatch: AppDispatch, idRoom: string) => {
    return baseRequest<void>(async () => {
        const resp = await $host.get<IRoom>(`/rooms/${idRoom}`);

        const {data} = resp;

        dispatch(chatRoomActions.setChatRoom({...data}));
    });
}