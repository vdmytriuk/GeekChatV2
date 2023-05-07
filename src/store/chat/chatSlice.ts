import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IChatState} from "./types";

const initialState: IChatState = {
    activeChatRoomId: ""
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChatRoomId(state, action: PayloadAction<string>) {
            state.activeChatRoomId = action.payload;
        }
    }
});

export const {
    reducer: chatReducer,
    actions: chatActions
} = chatSlice;