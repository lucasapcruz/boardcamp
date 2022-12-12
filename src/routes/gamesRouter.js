import { Router } from "express";
import { createGame, getGames } from "../controllers/games.controller.js";
import { gamesSchemaValidation } from "../middlewares/gamesSchemaValidation.js";

const gamesRoute = Router();

gamesRoute.post("/games", gamesSchemaValidation, createGame)
gamesRoute.get("/games", getGames)

export default gamesRoute;
