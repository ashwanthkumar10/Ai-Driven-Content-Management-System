import express from "express";
import { requirePermission } from "../middlewares/permissionMiddleware.js";
import contentController from "../controllers/content.controller.js";

const router = express.Router();

router.post("/", requirePermission("create:content"), contentController.create);
router.get("/", requirePermission("read:content"), contentController.getAll);
router.put("/:id", requirePermission("update:content"), contentController.update);
router.delete("/:id", requirePermission("delete:content"), contentController.remove);

export default router;
