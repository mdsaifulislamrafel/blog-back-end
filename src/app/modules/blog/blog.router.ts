import { Router } from "express";
import { blogValidation } from "./blog.validation";
import { BlogCOntroller } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constend";

const router = Router();

router.post('/', auth(USER_ROLE.user), validateRequest(blogValidation.createBlogValidationSchema), BlogCOntroller.createBlog);

router.patch('/:id', auth(USER_ROLE.user), validateRequest(blogValidation.updateBlogValidationSchema), BlogCOntroller.updateBlog);

router.delete('/:id', auth(USER_ROLE.user), BlogCOntroller.deleteBlog)

router.get('/', BlogCOntroller.getPublicBlog);

export const blogRouter = router;