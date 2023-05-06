import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IAppState, INotificationPayload} from "./types";

const initialState: IAppState = {
    isInitialAppLoaded: false,
    isAppLoading: false,
    appNotificationTitle: "",
    appNotificationText: "",
    appNotificationVisible: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsAppLoading(state, action: PayloadAction<boolean>) {
            state.isAppLoading = action.payload;
        },
        setIsInitialAppLoaded(state) {
            state.isInitialAppLoaded = true;
        },
        setAppNotification(state, action: PayloadAction<INotificationPayload>) {
            state.appNotificationVisible = false;

            state.appNotificationTitle = action.payload.title;
            state.appNotificationText = action.payload.text;
            state.appNotificationVisible = true;
        },
        resetAppNotification(state) {
            state.appNotificationTitle = "";
            state.appNotificationText = "";
            state.appNotificationVisible = false;
        }
    }
});

export const {
    reducer: appReducer,
    actions: appActions
} = appSlice;