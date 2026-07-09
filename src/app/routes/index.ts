import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";

const router = Router();
router.use("/user", UserRoutes);
export const AllRouters = router;
