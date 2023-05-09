import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {LOCAL_STORAGE_USER_KEY} from "../../shared/common/config/localStorage";

import {IUserState} from "./types";
import {IUser} from "../../shared/common/types";

const initialState: IUserState = {
    _id: null,
    username: '',
    email: '',
    rooms: [],
    isAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        },
        logout() {
            localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
            return {
                ...initialState
            }
        }
    }
});

export const {
    reducer: userReducer,
    actions: userActions
} = userSlice;