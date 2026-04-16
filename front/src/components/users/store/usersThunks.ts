import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import type {
  RegisterMutation,
  AuthResponse,
  ValidationError,
  LoginMutation,
  GlobalError,
} from "../../../types";
import axiosApi from "../../../axiosApi";
import { isAxiosError } from "axios";

export const register = createAsyncThunk<
  AuthResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>(
  "users/register",

  async (registerMutation, { rejectWithValue }) => {
    console.log(registerMutation)
    const formData = new FormData();

    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];
    keys.forEach(key => {
      const value = registerMutation[key];
      if (value !== null) formData.append(key, value)
    })

    try {
      const response = await axiosApi.post<AuthResponse>("/users", formData);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<
  AuthResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>(
  "users/login",

  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<AuthResponse>(
        "/users/sessions",
        loginMutation,
      );

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  },
);


export const logout = createAsyncThunk<void, void>(
  "users/logout",
  async () => {

    await axiosApi.delete("/users/sessions");
  },
);