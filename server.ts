// IMPORTS
require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
import { testConnection } from "./config/database";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import projectRouters from "./routes/projectRoutes";
import submissionRouter from "./routes/submissionRoutes";
import commentsRouter from "./routes/commentRoutes";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve static assets from public
app.use(express.static(path.join(__dirname, "public")));
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRouters);
app.use("/api/submissions", submissionRouter);
app.use("/api/comments", commentsRouter);

// 404 ERROR - Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    sucess: false,
    message: "Not found! The route you have selected does not exist",
  });
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html");
});

const startServer = async () => {
  await testConnection();
  app.listen(process.env.PORT || 5000, () => {
    console.log(`App running on http://localhost:${process.env.PORT || 5000}`);
  });
};

startServer();
