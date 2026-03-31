import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  RegisterMutation,
  AuthResponse,
  ValidationError,
  User,
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
    try {
      const response = await axiosApi.post<AuthResponse>(
        "/users",
        registerMutation,
      );
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
