import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { GearRoutes } from "../module/gear/gear.router";
import { Categoroy } from "../../../generated/prisma/enums";
import { CategoryRoutes } from "../module/category/category.router";

const router = Router();
router.use("/user", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/category", CategoryRoutes);
router.use("/provider", GearRoutes);
export const AllRouters = router;
