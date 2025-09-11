import express from "express";
import { requirePermission } from "../middlewares/permissionMiddlewares.js";
import contentController from "../controllers/content.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-content", authMiddleware, requirePermission("create_content"), contentController.createContent);
router.get("/get-all-contents" ,authMiddleware, requirePermission("view_content"), contentController.getAllContents);
// router.put("/:id", requirePermission("edit_content"), contentController.update);
// router.delete("/:id", requirePermission("delete_content"), contentController.remove);

export default router;
