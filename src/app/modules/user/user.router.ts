import { Router } from "express";
import { UserController } from "./user.controller";
import { validationUser } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();
router.post('/register', validateRequest(validationUser.userModelValidation), UserController.createRegisterUser)
router.post('/login', UserController.loginUser)

export const UserRoutes = router;