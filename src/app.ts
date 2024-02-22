import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is our tour backEnd");
});
app.get("/tour/v1", (req, res) => {
  res.send("This is our tour");
});
app.get("/api/v1", (req, res) => {
  res.send({
    name: "backend",
  });
});

// handle not route

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
