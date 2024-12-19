import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        element: UserRoutes,
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.element);
});

export default router;