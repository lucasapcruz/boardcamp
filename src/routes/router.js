import { Router } from "express";
import categoriesRoute from "./categoriesRouter.js";
import customersRoute from "./customerRouter.js";
import gamesRoute from "./gamesRouter.js";

const router = Router();

router.use(categoriesRoute);
router.use(gamesRoute)
router.use(customersRoute)

export default router;
