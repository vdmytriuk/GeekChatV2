import jwt_decode from "jwt-decode";

import $host from "../../http/host";

import {AppDispatch} from "../store";
import {userActions} from "./userSlice";

import {LOCAL_STORAGE_USER_KEY} from "../../common/config/localStorage";

import {baseRequest} from "../../common/base/baseRequest";

import {IUser} from "../../common/types";

export const setUserProfile = (dispatch: AppDispatch) => {
    return baseRequest<any>(async () => {
        const user_token = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

        if (!user_token) {
            dispatch(userActions.logout());
            return;
        }

        const decoded: { userId: string } = jwt_decode(user_token);

        const {userId} = decoded;

        $host.defaults.headers.common['Authorization'] = `Bearer ${user_token}`;

        const resp = await $host.get<IUser>(`/users/${userId}`);

        const user = resp?.data;

        dispatch(userActions.setUser(user));
    }, { title: "", text: "" });
}