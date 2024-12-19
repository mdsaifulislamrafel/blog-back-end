import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const registerUserIntoDB = async (payload: TUser) => {

  // Hash the password before saving it to the database
  const result = await UserModel.create(payload);
  return result;
};

export const userServices = {
  registerUserIntoDB,
};
