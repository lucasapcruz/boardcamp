import { Router } from "express";
import { createCategory } from "../controllers/categories.controller.js";
import { categoriesSchemaValidation } from "../middlewares/categoriesSchemaValidation.js";

const categoriesRoute = Router();

categoriesRoute.post("/categories", categoriesSchemaValidation, createCategory)

export default categoriesRoute;
