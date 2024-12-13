import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { Server } from "http";
import cors from "cors";
import { router } from "../routes/router";
dotenv.config();


export const port = process.env.PORT;

const app: Express = express();
let httpServer: Server;

export const initServer = () => {
  return new Promise<void>((resolve, reject) => {
    app.use(express.json()); // JSON parsing middleware
    app.use(express.urlencoded({ extended: true })); // URL-encoded body parsing middleware
    app.use(cors()); // CORS middleware

    // Mount the routes
    app.use(process.env.BASE_URL ?? "/api", router);

    // Handle 404 errors
    app.use((req: Request, res: Response) => {
      res.status(404).send("404: File Not Found");
    });

    // Start the server
    httpServer = app
      .listen(port, () => {
        console.log(`Web server listening on ${port}`);
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export const closeServer = () => {
  return new Promise<void>((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
