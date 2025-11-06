// IMPORTS
require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
import { testConnection } from "./config/database";

const app: Express = express();
app.use(express.json());
// serve static assets from public
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 404 ERROR - Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    sucess: false,
    message: "Not found! The route you have selected does not exist",
  });
});

const startServer = async () => {
  await testConnection();
  app.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
  });
};

startServer();
