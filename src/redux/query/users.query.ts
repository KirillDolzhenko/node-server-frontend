import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";
import { IUserWithToken } from "../../types/entities.types";
import { IMutationPutUser, IMutationResponse } from "../../types/redux.types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${config.server.url}users` }),
  endpoints: (builder) => ({
    putUser: builder.mutation<IUserWithToken, IMutationPutUser>({
      query: (data) => ({
        url: ``,
        method: "PUT",
        body: {
          ...data.data,
        },
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      transformResponse(response: IMutationResponse) {
        return response.data;
      },
    }),
  }),
});

export const { usePutUserMutation } = usersApi;
