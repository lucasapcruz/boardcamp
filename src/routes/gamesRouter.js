import { Router } from "express";
import { createGame } from "../controllers/games.controller.js";
import { gamesSchemaValidation } from "../middlewares/gamesSchemaValidation.js";

const gamesRoute = Router();

gamesRoute.post("/games", gamesSchemaValidation, createGame)

export default gamesRoute;
