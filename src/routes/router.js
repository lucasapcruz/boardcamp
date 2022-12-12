import { Router } from "express";
import categoriesRoute from "./categoriesRouter.js";
import customersRoute from "./customerRouter.js";
import gamesRoute from "./gamesRouter.js";
import rentalsRoute from "./rentalsRouter.js";

const router = Router();

router.use(categoriesRoute);
router.use(gamesRoute)
router.use(customersRoute)
router.use(rentalsRoute)

export default router;
