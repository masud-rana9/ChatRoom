import { Request, Response } from "express";
import { CatchAsync } from "../../utils/CatchAsync";
import sendResponse from "../../utils/sendResponse";
import { roomsService } from "./rooms.service";

const createRooms = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req?.user;
    const result = await roomsService.createRoomsIntoBD(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Rooms created successfully",
      data: result,
    });
  }
);

const getRooms = CatchAsync(async (req: Request, res: Response) => {
  const result = await roomsService.getRoomsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

const getMyRooms = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req?.user;
    const result = await roomsService.getMyRoomsFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Rooms retrieved successfully",
      data: result,
    });
  }
);

const getRoomsById = CatchAsync(async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const result = await roomsService.getRoomsByIdFromDB(roomId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

const updateRoomsById = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { roomId } = req.params;

    const result = await roomsService.UpdateRoomsByIdIntoDB(roomId, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Rooms information updated successfully",
      data: result,
    });
  }
);

const updateRoomsMessageById = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { roomId } = req.params;
    const user = req?.user;

    const result = await roomsService.UpdateRoomsMessageByIdIntoDB(
      roomId,
      req.body,
      user
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Rooms information updated successfully",
      data: result,
    });
  }
);

const deleteRoomsById = CatchAsync(async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const result = await roomsService.deleteRoomsByIdFromDB(roomId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rooms deleted successfully",
    data: result,
  });
});

export const RoomsController = {
  createRooms,
  getRooms,
  getMyRooms,
  getRoomsById,
  updateRoomsById,
  deleteRoomsById,
  updateRoomsMessageById,
};
