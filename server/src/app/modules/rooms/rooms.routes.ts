import express from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RomsValidationSchemas } from "./rooms.validation";
import { RoomsController } from "./rooms.controller";

const router = express.Router();

router.post(
  "/rooms",
  validateRequest(RomsValidationSchemas.roomsSchema),
  auth(),
  RoomsController.createRooms
);

router.get("/rooms", RoomsController.getRooms);

router.get("/my-rooms", RoomsController.getMyRooms);

router.get("/rooms/:roomId", RoomsController.getRoomsById);

router.put(
  "/rooms/:roomId",
  validateRequest(RomsValidationSchemas.roomUpdateSchema),
  auth(),
  RoomsController.updateRoomsById
);

router.put(
  "/roomsMessage/:roomId",
  validateRequest(RomsValidationSchemas.roomUpdateSchema),
  auth(),
  RoomsController.updateRoomsMessageById
);

router.delete("/rooms/:roomId", auth(), RoomsController.deleteRoomsById);

export const RoomRoutes = router;
