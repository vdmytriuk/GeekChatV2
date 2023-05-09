import $host from "../../../shared/http/host";

import {baseRequest} from "../../../shared/common/base/baseRequest";

import { AppDispatch } from "../../../store/store";

export const uploadFileRequest = (dispatch: AppDispatch, body: FormData) => {
    return baseRequest<any>(async () => {
        const resp = await $host.post('/upload', body);

        return resp;
    });
}