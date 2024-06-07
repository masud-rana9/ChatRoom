import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import prisma from "../../utils/prisma";
import * as bcrypt from "bcrypt";
import { config } from "../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      userId: userData.id,
      userName: userData.name,
    },
    config.jwt_access_secret as Secret,
    config.jwt_expires_in as string
  );
  const { password: _, ...user } = userData;

  const responsesData = {
    id: user.id,
    name: user.name,
    email: user.email,
    token: accessToken,
  };
  return responsesData;
};

export const AuthServices = {
  loginUser,
};
