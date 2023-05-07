import $host from "../../../shared/http/host";

import {LOCAL_STORAGE_USER_KEY} from "../../../shared/common/config/localStorage";

import {AppDispatch} from "../../../store/store";

import {baseRequest} from "../../../shared/common/base/baseRequest";
import {IRoomEditData} from "../types";

export const editUserRequest = (dispatch: AppDispatch, id: string, {name, description}: IRoomEditData) => {
    return baseRequest<any>(async () => {
        const resp = await $host.post(`/rooms/${id}`, {name, description});

    }, { title: "Done!", text: "Room edited!" });
}