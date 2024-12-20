import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.service";
import httpStatus from "http-status";

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await adminServices.blockUserIntoDB(userId, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User blocked successfully",
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await adminServices.deleteBlogIntoDB(req.params.id, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
