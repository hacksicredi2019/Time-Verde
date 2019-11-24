import "dotenv/config";
import express from "express";
import "express-async-errors";
import path from "path";

import Youch from "youch";
import routes from "./routes";
import "./database";

const cors = require("cors");

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
