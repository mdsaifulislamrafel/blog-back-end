import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.updateBlogInDB(req.params.id, req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});


const deleteBlog = catchAsync(async (req, res) => {
 await BlogServices.deleteBlogFromDB(req.params.id, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
  });
});

const getPublicBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllPublishedBlogs();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Public blog fetched successfully",
    data: result,
  });
});
export const BlogCOntroller = {
  createBlog,
  getPublicBlog,
  updateBlog,
  deleteBlog
};
