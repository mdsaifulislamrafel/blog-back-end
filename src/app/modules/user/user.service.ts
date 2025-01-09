import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../../config";

const registerUserIntoDB = async (payload: TUser) => {
  // Hash the password before saving it to the database
  const result = await UserModel.create(payload);
  return result;
};

const loginUserIntoDB = async (payload: Partial<TUser>) => {
  const user = await UserModel.isUserExists(payload?.email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  // Check if the password matches the hashed password stored in the database
  const isMatch = await bcrypt.compare(
    payload?.password as string,
    user.password
  );
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // create token and send the client
  const jwtPayload = {
    email: user.email,
    password: user.password,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  return { token };
};
export const userServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
