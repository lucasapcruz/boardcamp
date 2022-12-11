import { Router } from "express";
import genericRoute from "./genericRoute.js";

const router = Router();

router.use(genericRoute);

export default router;
