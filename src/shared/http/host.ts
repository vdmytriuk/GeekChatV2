import axios from "axios";

import {LOCAL_STORAGE_USER_KEY} from "../common/config/localStorage";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_V1_URL
});

const token = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

if (token) {
    $host.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

$host.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default $host;