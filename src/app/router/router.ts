import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { blogRouter } from "../modules/blog/blog.router";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        element: UserRoutes,
    },
    {
        path: '/blogs',
        element: blogRouter,
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.element);
});

export default router;