import { Model } from "mongoose";
import { USER_ROLE } from "./user.constend";

/* eslint-disable no-unused-vars */
export interface TUser {
  [x: string]: any;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
}

export interface Users extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
}

export type TUserRole = keyof typeof USER_ROLE;
