import { Router } from "express";
import { createGameRent, deleteRent, returnGame, getRents } from "../controllers/rentals.controller.js";
import { rentSchemaValidation } from "../middlewares/rentalsSchemaValidation.js";

const rentalsRoute = Router();

rentalsRoute.post("/rentals", rentSchemaValidation, createGameRent)
rentalsRoute.get("/rentals", getRents)
rentalsRoute.delete("/rentals/:id", deleteRent)
rentalsRoute.post("/rentals/:id/return", returnGame)


export default rentalsRoute;
