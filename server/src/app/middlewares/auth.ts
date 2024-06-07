import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../helpars/jwtHelpers";
import { config } from "../config";

const auth = () => {
  return async (
    req: Request & { user?: any },
    _res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_access_secret as Secret
      );
      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }
      req.user = verifiedUser;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
