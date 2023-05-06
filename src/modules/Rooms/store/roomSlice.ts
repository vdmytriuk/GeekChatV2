import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRoom} from "../../../shared/common/types";

export interface IRoomsState {
    publicRooms: IRoom[];
    myRooms: IRoom[];
    activeRoomId: string;
}

const initialState: IRoomsState = {
    publicRooms: [],
    myRooms: [],
    activeRoomId: "",
}

export const roomSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setPublicRooms(state, action: PayloadAction<IRoom[]>) {
            state.publicRooms = action.payload
        },
        setMyRooms(state, action: PayloadAction<IRoom[]>) {
            state.myRooms = action.payload
        },
    }
});

export const {
    reducer: roomsReducer,
    actions: roomsActions
} = roomSlice;