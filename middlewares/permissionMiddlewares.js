import { checkPermission } from '../utils/permission.utils.js';

export function requirePermission(permission) {
  // Validate permission parameter
  if (!permission || typeof permission !== 'string') {
    throw new Error('Permission parameter must be a non-empty string');
  }

  return async (req, res, next) => {
    try {
      const userId = req.user?.id;
      console.log('this is the user id in permission middleware', userId);

      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
      }

      // Check if user ID exists
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Invalid user authentication',
        });
      }

      const allowed = await checkPermission(userId, permission);

      if (!allowed) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden: insufficient permissions',
          requiredPermission: permission,
        });
      }

      // Add permission to request object for logging/tracking purposes
      req.permission = permission;
      next();
    } catch (err) {
      console.error(`Permission check failed for ${permission}:`, err);

      // Differentiate between different types of errors
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Invalid permission request',
          details: err.message,
        });
      }

      return res.status(500).json(
        console.error(`Error checking permission ${permission}:`, err),

        {
          success: false,
          error: 'Internal server error',
          message: 'Failed to verify permissions',
        }
      );
    }
  };
}
