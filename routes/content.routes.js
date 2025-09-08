import express from "express";
import { requirePermission } from "../middlewares/permissionMiddlewares.js";
import contentController from "../controllers/content.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-content",authMiddleware, requirePermission("create:content"), contentController.createContent);
// router.get("/", requirePermission("read:content"), contentController.getAll);
// router.put("/:id", requirePermission("update:content"), contentController.update);
// router.delete("/:id", requirePermission("delete:content"), contentController.remove);

export default router;
