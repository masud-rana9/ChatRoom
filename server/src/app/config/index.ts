import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT,
  jwt_access_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.EXPIRES_IN,
};
