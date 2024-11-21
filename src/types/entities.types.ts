export enum EnumUsersRole {
  USER = "0",
  ADMIN = "1",
}

export interface IUser {
  id: number;
  email: string;
  description?: string;
  role: EnumUsersRole;
}

export interface IUserWithToken extends IUser {
  token: string;
}
