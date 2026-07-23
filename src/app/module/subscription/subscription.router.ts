import { Router } from "express";

import { subscriptionController } from "./subscription.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../../generated/prisma/enums";
// import { checkAuth } from "../../interfaces/index";
// import { Role } from "../../../../generated/prisma/enums";

const router = Router();

router.post(
  "/checkout",
  auth(Role.Admin, Role.Customer, Role.Provider),
  subscriptionController.createCheckoutSession,
);

//cancel subscription

router.post("/webhook", subscriptionController.handleWebhook);

router.get(
  "/status",
  auth(Role.Admin, Role.Customer, Role.Provider),
  subscriptionController.getSubscriptionStatus,
);

export const SubscriptionRoutes = router;
