import axios from "axios";
import { apiURL } from "./constants";
import type { RootState } from "./app/store";
import type { Store } from "@reduxjs/toolkit";
import type { InternalAxiosRequestConfig } from "axios";

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;

    if (token) {
      config.headers.set("Authorization", token);
    }

    return config;
  });
};

const axiosApi = axios.create({
  baseURL: apiURL,
});

export default axiosApi;