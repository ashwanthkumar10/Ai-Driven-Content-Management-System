import prisma from '../config/db.js';

export async function debugUserRole(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
      },
    });

    console.log('Debug User Info:', {
      userId: user.id,
      name: user.name,
      roleId: user.role_id,
      role: user.role,
    });

    if (user.role_id) {
      const roleWithPermissions = await prisma.role.findUnique({
        where: { id: user.role_id },
        include: {
          roles_permissions: {
            include: {
              permission: true,
            },
          },
        },
      });

      console.log('Debug Role Info:', {
        roleId: roleWithPermissions.id,
        roleName: roleWithPermissions.role_name,
        permissions: roleWithPermissions.roles_permissions.map((rp) => ({
          key: rp.permission.permission_key,
          description: rp.permission.description,
        })),
      });
    }
  } catch (error) {
    console.error('Debug Error:', error);
  }
}
