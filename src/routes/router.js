import { Router } from "express";
import categoriesRoute from "./categoriesRouter.js";

const router = Router();

router.use(categoriesRoute);

export default router;
