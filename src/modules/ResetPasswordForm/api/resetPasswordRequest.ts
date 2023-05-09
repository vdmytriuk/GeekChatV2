import $host from "../../../shared/http/host";

import {IResetPasswordData} from "../types";

import {AppDispatch} from "../../../store/store";

import {baseRequest} from "../../../shared/common/base/baseRequest";

export const resetPasswordRequest = (dispatch: AppDispatch, {email}: IResetPasswordData) => {
    return baseRequest<any>(async () => {
        const resp = await $host.post('/users/password-reset', {email});

    }, { title: "Done!", text: "New password sent to your email." });
}