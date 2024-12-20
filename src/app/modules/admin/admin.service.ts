import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Blog } from "../blog/blog.model";

const blockUserIntoDB = async (userId: string, user: JwtPayload) => {
  const singleUser = await UserModel.findOne({ _id: userId });
  // user id check
  if (!singleUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // check if user already blocked
  if (singleUser?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "User is already blocked");
  }

  if (user.role !== "admin") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Only admin users can block users"
    );
  }

  //   change for admin users blocked
  singleUser.isBlocked = true;
  await singleUser.save();
};

const deleteBlogIntoDB = async (id: string, user: JwtPayload) => {
  const singleBlog = await Blog.findOne({ _id: id });
  if (!singleBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  if (user.role !== "admin") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Only admin users can block users"
    );
  }

  await Blog.findByIdAndDelete(id);
};

export const adminServices = {
  blockUserIntoDB,
  deleteBlogIntoDB,
};
