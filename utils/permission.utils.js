import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Permission utility functions for checking user permissions
 */

// Permission constants
export const PERMISSIONS = {
    // Content permissions
    CREATE_CONTENT: 'create:content',
    READ_CONTENT: 'read:content',
    UPDATE_CONTENT: 'update:content',
    DELETE_CONTENT: 'delete:content',
    
    // User permissions
    MANAGE_USERS: 'manage:users',
    VIEW_USERS: 'view:users',
    
    // Role permissions
    MANAGE_ROLES: 'manage:roles',
    VIEW_ROLES: 'view:roles'
};

/**
 * Get user with roles and permissions from database
 * @private
 */
async function getUserWithRoles(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            roles: {
                include: {
                    role: {
                        include: {
                            rolePermissions: {
                                include: {
                                    permission: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

/**
 * Check if a user has a specific permission
 * @param {string} userId - User ID to check
 * @param {string} requiredPermission - Permission key to check
 * @returns {Promise<boolean>} Whether user has permission
 */
export async function checkPermission(userId, requiredPermission) {
    try {
        const user = await getUserWithRoles(userId);
        
        return user.roles.some(userRole => 
            userRole.role.rolePermissions.some(rolePermission => 
                rolePermission.permission.key === requiredPermission
            )
        );
    } catch (error) {
        console.error('Permission check failed:', error);
        throw error;
    }
}

/**
 * Check if user has any of the specified permissions
 * @param {string} userId - User ID to check
 * @param {string[]} permissions - Array of permission keys
 * @returns {Promise<boolean>} Whether user has any permission
 */
export async function hasAnyPermission(userId, permissions) {
    try {
        const user = await getUserWithRoles(userId);
        
        return user.roles.some(userRole => 
            userRole.role.rolePermissions.some(rolePermission => 
                permissions.includes(rolePermission.permission.key)
            )
        );
    } catch (error) {
        console.error('Permission check failed:', error);
        throw error;
    }
}

/**
 * Get all permissions for a user
 * @param {string} userId - User ID
 * @returns {Promise<string[]>} Array of permission keys
 */
export async function getUserPermissions(userId) {
    try {
        const user = await getUserWithRoles(userId);
        
        const permissions = new Set();
        user.roles.forEach(userRole => {
            userRole.role.rolePermissions.forEach(rolePermission => {
                permissions.add(rolePermission.permission.key);
            });
        });

        return Array.from(permissions);
    } catch (error) {
        console.error('Failed to get user permissions:', error);
        throw error;
    }
}

/**
 * Validate permission format
 * @param {string} permission - Permission key to validate
 * @returns {boolean} Whether permission format is valid
 */
export function isValidPermissionFormat(permission) {
    // Permission format should be 'action:resource'
    const permissionRegex = /^[a-z]+:[a-z]+$/;
    return permissionRegex.test(permission);
}
