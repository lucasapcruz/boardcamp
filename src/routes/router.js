import { Router } from "express";
import categoriesRoute from "./categoriesRouter.js";
import gamesRoute from "./gamesRouter.js";

const router = Router();

router.use(categoriesRoute);
router.use(gamesRoute)

export default router;
