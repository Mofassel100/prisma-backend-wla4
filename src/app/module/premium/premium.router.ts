import { Router } from "express";

// import { checkAuth } from "../../interfaces";
// import { Role } from "../../../../generated/prisma/enums";
import { premiumController } from "./premium.controler";
import { subscriptionGuard } from "../../middleware/premiumGuard";
import { auth } from "../../middleware/auth";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();

router.get(
  "/",
  auth(Role.Admin, Role.Customer, Role.Provider),
  subscriptionGuard(),
  premiumController.getPremiumContent,
);

export const premiumRoutes = router;
