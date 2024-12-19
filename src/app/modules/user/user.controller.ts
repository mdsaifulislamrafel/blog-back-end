import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import httpStatus from "http-status";

const createRegister = catchAsync(async (req, res) => {

  const result = await userServices.registerUserIntoDB(req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const UserController = {
  createRegister,
};
