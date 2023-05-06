import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {appReducer} from "./app";
import {userReducer} from "./user";

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;