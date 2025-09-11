// Add more detailed debugging for the Prisma import
import prisma from '../config/db.js';



// Ensure database is connected with better error handling
if (!prisma) {
    console.error('❌ Prisma is null or undefined');
    throw new Error('Database connection not initialized - prisma is null/undefined');
}

if (typeof prisma !== 'object') {
    console.error('❌ Prisma is not an object, got:', typeof prisma);
    throw new Error(`Database connection not initialized - expected object, got ${typeof prisma}`);
}

if (!prisma.user) {
    console.error('❌ Prisma.user is not available');
    console.error('Available prisma properties:', Object.keys(prisma));
    throw new Error('Database connection not initialized - user model not available');
}

console.log('✅ Prisma connection verified in permission.utils.js');

//------------------------------------

// other than check permission function , all other functions are useful for admin and future use cases 
//but for now , only checkPermission is used in the project

//-------------------------------------

/**
 * Permission utility functions for checking user permissions
 */

// Permission constants
export const PERMISSIONS = {
    CREATE_CONTENT: 'create_content',
    READ_CONTENT: 'view_content',   // matches DB
    UPDATE_CONTENT: 'edit_content',
    DELETE_CONTENT: 'delete_content',
    MANAGE_USERS: 'manage_users',
    VIEW_USERS: 'view_users',
    MANAGE_ROLES: 'manage_roles',
    VIEW_ROLES: 'view_roles'
};


/**
 * Get user with roles and permissions from database
 * @private
 */
async function getUserWithRoles(userId) {
    console.log('Fetching user with roles and permissions for userId:', userId);
    
    // Add additional safety check right before the database call
    if (!prisma || !prisma.user) {
        console.error('❌ Prisma or prisma.user is not available at runtime');
        throw new Error('Database connection lost or not properly initialized');
    }
    
    // Import and use the debug function
    const { debugUserRole } = await import('./debug.js');
    await debugUserRole(userId);
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                role: {
                    include: {
                        roles_permissions: {
                            include: {
                                permission: true
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            console.log('❌ User not found for ID:', userId);
            throw new Error('User not found');
        }

        console.log('✅ User found with role:', user.role?.name || 'No role assigned');
        console.log('User details:', user);
        
        return user;
    } catch (dbError) {
        console.error('❌ Database query failed:', dbError);
        throw dbError;
    }
}

/**
 * Check if a user has a specific permission
 * @param {string} userId - User ID to check
 * @param {string} requiredPermission - Permission key to check
 * @returns {Promise<boolean>} Whether user has permission
 */
export async function checkPermission(userId, requiredPermission) {
    try {
        console.log(`🔍 Checking permission '${requiredPermission}' for user ${userId}`);
        
        const user = await getUserWithRoles(userId);
        
        // Check if user has a role and that role has permissions
        if (!user.role || !user.role.roles_permissions) {
            console.log('❌ User has no role or role has no permissions');
            return false;
        }
        
        // Check if any of the role's permissions match the required permission
        const hasPermission = user.role.roles_permissions.some(rolePermission => 
            rolePermission.permission.permission_key === requiredPermission
        );
        
        console.log(`${hasPermission ? '✅' : '❌'} Permission check result:`, hasPermission);
        return hasPermission;
    } catch (error) {
        console.error('❌ Permission check failed:', error);
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
        
        if (!user.role || !user.role.roles_permissions) {
            return false;
        }

        return user.role.roles_permissions.some(rolePermission => 
            permissions.includes(rolePermission.permission.permission_key)
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
        
        if (!user.role || !user.role.roles_permissions) {
            return [];
        }

        const permissions = new Set();
        user.role.roles_permissions.forEach(rolePermission => {
            permissions.add(rolePermission.permission.permission_key);
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