import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router/router";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Blog Server!",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
