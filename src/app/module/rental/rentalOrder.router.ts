import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { RentalOrderController } from "./rentalOrder.controller";

const router = Router();

router.post(
  "/rentals",
  checkAuth(Role.Customer),
  RentalOrderController.rentalOrderCreateFromDB,
);
router.get(
  "/rentals",
  checkAuth(Role.Customer),
  RentalOrderController.rentalOrderGetUserFromDB,
);
router.get(
  "/rentals/:id",
  checkAuth(Role.Customer),
  RentalOrderController.rentalOrderGetSingleUserFromDB,
);

export const RentalOrderRoutes = router;
