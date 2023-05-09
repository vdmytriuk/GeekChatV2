import $host from "../../../shared/http/host";

import {LOCAL_STORAGE_USER_KEY} from "../../../shared/common/config/localStorage";

import {IUserRegisterData} from "../types";

import {AppDispatch} from "../../../store/store";
import {setUserProfile} from "../../../store/user/operation";

import {baseRequest} from "../../../shared/common/base/baseRequest";

interface IUserRegisterResponse {
    exp: string;
    name: string;
    token: string;
}

export const registerUserRequest = (dispatch: AppDispatch, {username, email, password, }: IUserRegisterData) => {
    return baseRequest<any>(async () => {
        const resp = await $host.post<IUserRegisterResponse>('/users/register', {username, email, password});

        localStorage.setItem(LOCAL_STORAGE_USER_KEY, resp.data.token);

        dispatch(setUserProfile(dispatch));
    }, { title: "Hello!", text: "Registered" });
}