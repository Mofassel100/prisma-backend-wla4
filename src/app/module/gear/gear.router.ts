import { Router } from "express";
import { GearController } from "./gear.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();
router.post(
  "/provider/gear",
  checkAuth(Role.Provider),
  GearController.gearCreateFromDB,
);
router.get("/gear", GearController.gearGetAllFromDB);
router.get("/gear/:id", GearController.gearSingleFromDB);
router.put(
  "/provider/orders",
  checkAuth(Role.Provider),
  GearController.gearUpdatedFromDB,
);
router.patch(
  "/provider/orders",
  checkAuth(Role.Provider),
  GearController.gearUpdatedOrderFromDB,
);
router.delete(
  "/provider/orders",
  checkAuth(Role.Provider),
  GearController.gearDeleteFromDB,
);
export const GearRoutes = router;
