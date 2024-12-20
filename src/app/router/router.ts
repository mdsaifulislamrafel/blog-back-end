import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { blogRouter } from "../modules/blog/blog.router";
import { adminRoutes } from "../modules/admin/admin.router";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        element: UserRoutes,
    },
    {
        path: '/blogs',
        element: blogRouter,
    },
    {
        path: '/admin',
        element: adminRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.element);
});

export default router;