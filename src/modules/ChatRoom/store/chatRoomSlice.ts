import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRoom} from "../../../shared/common/types";

const initialState: IRoom = {
    messages: [],
    name: "",
    description: "",
    owner: "",
    participants: []
}

export const chatRoomSlice = createSlice({
    name: 'chat-room',
    initialState,
    reducers: {
        setChatRoom(state, action: PayloadAction<IRoom>) {
            return {
                ...action.payload
            }
        }
    }
});

export const {
    reducer: chatRoomReducer,
    actions: chatRoomActions
} = chatRoomSlice;