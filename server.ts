// IMPORTS
require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";

const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello! Welcome to the Collaboration Code Plartform...");
});

// 404 ERROR - Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    sucess: false,
    message: "Not found! The route you have selected does not exist",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
