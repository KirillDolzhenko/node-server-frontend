import { IUserWithToken } from "./entities.types";

export interface IUserState {
  user: IUserWithToken | null;
}

export interface IMutationAuth {
  password: string;
  email: string;
}

export interface IDataPutUser {
  email?: string;
  description?: string | null;
}

export interface IRTKError {
  data: {
    data: {
      error: string;
    };
    statusCode: number;
  };
}

export interface IMutationPutUser {
  data: IDataPutUser;
  token: string;
}

export interface IMutationResponse {
  data: IUserWithToken;
  statusCode: number;
}
