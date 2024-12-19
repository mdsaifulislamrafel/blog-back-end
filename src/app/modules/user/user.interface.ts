import { Model } from "mongoose";

/* eslint-disable no-unused-vars */
export interface TUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    isBlocked: boolean;
}

export interface Users extends Model<TUser> {
    isUserExists(email: string): Promise<TUser | null>;
  }