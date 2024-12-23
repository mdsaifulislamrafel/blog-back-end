import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...requestedRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // check if the token
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized user!"
      );
    }
    
    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;

    const { email, role } = decoded;

    // check if the user is authenticated
    const user = await UserModel.isUserExists(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
    }

    // check if the user isBlocked
    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, "Your account is blocked");
    }

    // Ensure req.user contains user information including the id
    req.user = {
      id: user._id, 
      email,
      role
    };

    if (requestedRoles && !requestedRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized user!"
      );
    }

    next();
  });
};


export default auth;
