import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import routes from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://blogify1.vercel.app"],
    credentials: true,
  })
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Blog server is running perfectly",
  });
});

app.use("/api", routes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
