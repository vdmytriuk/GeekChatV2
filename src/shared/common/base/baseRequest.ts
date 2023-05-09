import { AppDispatch } from "../../../store/store";
import { INotificationPayload } from "../../../store/app/types";

import { appActions } from "../../../store/app";

type CallbackFn<T> = () => Promise<T>;

export const baseRequest = <T>(
    cb: CallbackFn<T>,
    notification?: INotificationPayload,
) => {
    return async (dispatch: AppDispatch): Promise<any> => {
        try {
            dispatch(appActions.setIsAppLoading(true));

            const result = await cb();

            if (notification) {
                dispatch(appActions.setAppNotification(notification));
            }

            return result;
        } catch (e) {
            dispatch(appActions.setAppNotification({title: "Error!", text: typeof e.response?.data?.error === "object" ? e.response?.data?.error.reduce((accum: string, current: any) => { return accum + current.message} , "") : e.response?.data?.error}));
        } finally {
            dispatch(appActions.setIsAppLoading(false));
        }
    };
};
