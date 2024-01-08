import { Router } from "express";
import { getRoom } from "../controllers/roomControllers.js";

const router = Router();

router.get("/", getRoom);

export default router;
