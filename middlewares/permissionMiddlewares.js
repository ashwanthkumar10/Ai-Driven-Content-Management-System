import { checkPermission } from "../services/permission.service.js";

export function requirePermission(permission) {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; // set by authMiddleware
      const allowed = await checkPermission(userId, permission);

      if (!allowed) {
        return res.status(403).json({ error: "Forbidden: insufficient permissions" });
      }

      next();
    } catch (err) {
      console.error("RBAC check failed:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
