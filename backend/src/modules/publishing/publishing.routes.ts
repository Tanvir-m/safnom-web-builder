import { Router } from "express";
import { publishingController } from "./publishing.controller.js";

const router = Router();

router.all("*", publishingController.placeholder);

export { router as publishingRoutes };
