import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import httpStatus from "http-status";

const createBlogIntoDB = async (payload: TBlog, user: JwtPayload) => {
  const data = {
    ...payload,
    author: user,
  };
  const result = (await Blog.create(data)).populate("author", "name email");
  return result;
};

const getAllPublishedBlogs = async (query: Record<string, unknown>) => {
  let search = "";
  console.log(query);

  if (query?.search) {
    search = query.search as string;
  }

  const searchQuery = Blog.find({
    $or: ["title"].map((field) => ({
      [field]: { $regex: search, $options: "i" },
    })),
  }).populate("author", "name email");

  const result = await searchQuery.find().populate("author", "name email");
  return result;
};

const updateBlogInDB = async (
  id: string,
  payload: Partial<TBlog>,
  user: JwtPayload
) => {
  // Check if the user is the author of the blog before updating it
  const blog = await Blog.findOne({ _id: id }).populate("author", "name email");

  if (!blog) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "User is not the author of the blog"
    );
  }
  // Check if the user is the author of the blog before updating it
  if (blog?.author?.email !== user?.email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "User is not the author of the blog"
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("author", "name email");
  return result;
};

const deleteBlogFromDB = async (id: string, user: JwtPayload) => {
  const blog = await Blog.findOne({ _id: id }).populate("author", "name email");
  // blog checkout
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }
  // check if the blog is authorized to delete
  if (blog?.author?.email !== user?.email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "User is not the author of the blog"
    );
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllPublishedBlogs,
  updateBlogInDB,
  deleteBlogFromDB,
};
