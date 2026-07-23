import { Router } from "express";
import { categoryController } from "./category.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.Admin),
  categoryController.categoryCreateFromDB,
);
router.get(
  "/",
  checkAuth(Role.Admin),
  categoryController.categoryUpdatedFromDB,
);

// router.post("/login", AuthController.loginUser);
// router.get(
//   "/me",
//   checkAuth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER),
//   AuthController.getMe,
// );
export const CategoryRoutes = router;
