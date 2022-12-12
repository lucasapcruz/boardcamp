import { Router } from "express";
import { createGameRent } from "../controllers/rentals.controller.js";
import { rentSchemaValidation } from "../middlewares/rentalsSchemaValidation.js";

const rentalsRoute = Router();

rentalsRoute.post("/rentals", rentSchemaValidation, createGameRent)


export default rentalsRoute;
