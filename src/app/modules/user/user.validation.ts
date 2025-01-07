import { z } from "zod";

const userModelValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["admin", "user"]).optional(),
  isBlocked: z.boolean().default(false)
});

export const validationUser = {
  userModelValidation,
};
