import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";

const router = Router();
router.use("/user", UserRoutes);
router.use("/auth", AuthRoutes);
export const AllRouters = router;
