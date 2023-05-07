import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {appReducer} from "./app";
import {userReducer} from "./user";
import {chatReducer} from "./chat";
import {roomsReducer} from "../modules/Rooms";
import {chatRoomReducer} from "../modules/ChatRoom/store";

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    rooms: roomsReducer,
    chat: chatReducer,
    chatRoom: chatRoomReducer,
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;