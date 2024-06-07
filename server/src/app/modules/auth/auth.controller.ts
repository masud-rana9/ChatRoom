import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { CatchAsync } from "../../utils/CatchAsync";

const loginUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
