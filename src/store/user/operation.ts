import jwt_decode from "jwt-decode";

import $host from "../../shared/http/host";

import {appActions} from "../app";
import {AppDispatch} from "../store";
import {userActions} from "./userSlice";

import {LOCAL_STORAGE_USER_KEY} from "../../shared/common/config/localStorage";

import {baseRequest} from "../../shared/common/base/baseRequest";

import {IUser} from "../../shared/common/types";

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

        dispatch(appActions.setIsAppLoading(true));

        const resp = await $host.get<IUser>(`/users/${userId}`);

        const user = resp?.data;

        dispatch(appActions.setIsAppLoading(false));
        dispatch(userActions.setUser(user));
    });
}