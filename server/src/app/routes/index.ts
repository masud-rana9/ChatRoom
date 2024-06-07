import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { BlogRoutes } from "../modules/blog/blog.routes";
import { RoomRoutes } from "../modules/rooms/rooms.routes";

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: BlogRoutes,
  },
  {
    path: "/",
    route: RoomRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
