import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constend";

const router = Router();

router.patch('/users/:userId/block', auth(USER_ROLE.admin), adminController.blockUser);

router.delete('/blogs/:id', auth(USER_ROLE.admin), adminController.deleteBlog);


export const adminRoutes = router;