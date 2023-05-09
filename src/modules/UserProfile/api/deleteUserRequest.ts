import $host from "../../../shared/http/host";

import {AppDispatch} from "../../../store/store";

import {baseRequest} from "../../../shared/common/base/baseRequest";
import {userActions} from "../../../store/user";


export const deleteUserRequest = (dispatch: AppDispatch, id: string) => {
    return baseRequest<any>(async () => {
        const resp = await $host.delete(`/users/${id}`);

        dispatch(userActions.logout());
    }, { title: "Done!", text: "User profile was deleted!" });
}