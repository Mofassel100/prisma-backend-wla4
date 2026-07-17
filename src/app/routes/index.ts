import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { GearRoutes } from "../module/gear/gear.router";
import { CategoryRoutes } from "../module/category/category.router";
import { RentalOrderRoutes } from "../module/rental/rentalOrder.router";

const router = Router();
router.use("/user", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/category", CategoryRoutes);
router.use("/provider", GearRoutes);
router.use("/", RentalOrderRoutes);
export const AllRouters = router;
