import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { GearRoutes } from "../module/gear/gear.router";
import { CategoryRoutes } from "../module/category/category.router";
import { RentalOrderRoutes } from "../module/rental/rentalOrder.router";
import { SubscriptionRoutes } from "../module/subscription/subscription.router";
import { premiumRoutes } from "../module/premium/premium.router";

const router = Router();
router.use("/user", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/", CategoryRoutes);
router.use("/", GearRoutes);
router.use("/", RentalOrderRoutes);
router.use("/subscription", SubscriptionRoutes);
router.use("/premium", premiumRoutes);
export const AllRouters = router;
