import { IMutationResponse } from "./../../types/redux.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";
import { IUserWithToken } from "../../types/entities.types";
import { IMutationAuth } from "../../types/redux.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${config.server.url}auth` }),
  endpoints: (builder) => ({
    login: builder.mutation<IUserWithToken, IMutationAuth>({
      query: (data) => ({
        url: `login`,
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse(response: IMutationResponse) {
        return response.data;
      },
    }),
    signUp: builder.mutation<IUserWithToken, IMutationAuth>({
      query: (data) => ({
        url: `signup`,
        method: "POST",
        body: {
          ...data,
        },
      }),
      transformResponse(response: IMutationResponse) {
        return response.data;
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
