import { Request, Response } from "express";
import { userService } from "./user.sevice";
import sendResponse from "../../utils/sendResponse";
import { CatchAsync } from "../../utils/CatchAsync";

const createUser = async (req: Request, res: Response) => {
  try {
    //console.log(req.body);
    const result = await userService.createUserIntoBD(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
      error: err,
    });
  }
};

const getProfile = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await userService.getProfileFromDB(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile retrieved successfully",
      data: result,
    });
  }
);

const updateProfile = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await userService.UpdateProfileIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

export const userController = {
  createUser,
  getProfile,
  updateProfile,
};
