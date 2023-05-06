import $host from "../../../shared/http/host";

import {LOCAL_STORAGE_USER_KEY} from "../../../shared/common/config/localStorage";

import {IUserLoginData} from "../types";

import {AppDispatch} from "../../../store/store";
import {setUserProfile} from "../../../store/user/operation";

import {baseRequest} from "../../../shared/common/base/baseRequest";

interface IUserAuthResponse {
    exp: string;
    name: string;
    token: string;
}

export const authUserRequest = (dispatch: AppDispatch, {email, password}: IUserLoginData) => {
    return baseRequest<any>(async () => {
        const resp = await $host.post<IUserAuthResponse>('/users/login', {email, password});

        localStorage.setItem(LOCAL_STORAGE_USER_KEY, resp.data.token);

        dispatch(setUserProfile(dispatch));
    }, { title: "Hello!", text: "You logged in." });
}