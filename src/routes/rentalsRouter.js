import { Router } from "express";
import { createGameRent, getRents } from "../controllers/rentals.controller.js";
import { rentSchemaValidation } from "../middlewares/rentalsSchemaValidation.js";

const rentalsRoute = Router();

rentalsRoute.post("/rentals", rentSchemaValidation, createGameRent)
rentalsRoute.get("/rentals", getRents)


export default rentalsRoute;
