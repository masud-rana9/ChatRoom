import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchemas } from "./user.validations";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchemas.userSchema),
  userController.createUser
);

router.get("/profile", auth(), userController.getProfile);

router.put(
  "/profile",
  validateRequest(userValidationSchemas.userProfileUpdateSchema),
  auth(),
  userController.updateProfile
);

export const userRoutes = router;
