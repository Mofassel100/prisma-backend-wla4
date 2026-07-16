import { Router } from "express";
import { GearController } from "./gear.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();

router.post("/gear", checkAuth(Role.Provider), GearController.gearCreateFromDB);
// router.post("/login", AuthController.loginUser);
// router.get(
//   "/me",
//   checkAuth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER),
//   AuthController.getMe,
// );
export const GearRoutes = router;
