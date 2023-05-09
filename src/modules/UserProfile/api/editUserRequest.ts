import $host from "../../../shared/http/host";

import {IUserEditData} from "../types";

import {AppDispatch} from "../../../store/store";
import {setUserProfile} from "../../../store/user/operation";

import {baseRequest} from "../../../shared/common/base/baseRequest";


export const editUserRequest = (dispatch: AppDispatch, id: string, {username, password, }: IUserEditData) => {
    return baseRequest<any>(async () => {
        const resp = await $host.patch(`/users/${id}`, {username, password});

        dispatch(setUserProfile(dispatch));
    }, { title: "Done!", text: "User profile was edited" });
}