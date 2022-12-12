import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categories.controller.js";
import { categoriesSchemaValidation } from "../middlewares/categoriesSchemaValidation.js";

const categoriesRoute = Router();

categoriesRoute.post("/categories", categoriesSchemaValidation, createCategory)
categoriesRoute.get("/categories", getCategories)

export default categoriesRoute;
