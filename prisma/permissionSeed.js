import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Fetch all roles and permissions
  const roles = await prisma.role.findMany();
  const permissions = await prisma.permission.findMany();

  // Helper functions
  const getRoleId = (name) => {
    const role = roles.find((r) => r.role_name.toLowerCase() === name.toLowerCase());
    if (!role) console.warn(`⚠️ Role not found: ${name}`);
    return role?.id;
  };
  const getPermId = (key) => {
    const perm = permissions.find((p) => p.permission_key.toLowerCase() === key.toLowerCase());
    if (!perm) console.warn(`⚠️ Permission not found: ${key}`);
    return perm?.id;
  };

  // Define role → permission mapping
  const rolePermissions = [
    {
      role: 'Admin',
      permissions: ['create_content', 'edit_content', 'delete_content', 'manage_users', 'view_content'],
    },
    {
      role: 'Creator',
      permissions: ['create_content', 'edit_content', 'view_content'],
    },
    {
      role: 'Viewer',
      permissions: ['view_content'],
    },
  ];

  // Upsert each mapping
  for (const rp of rolePermissions) {
    const roleId = getRoleId(rp.role);
    if (!roleId) continue;

    for (const permKey of rp.permissions) {
      const permId = getPermId(permKey);
      if (!permId) continue;

      await prisma.rolePermission.upsert({
        where: {
          role_id_permission_id: { role_id: roleId, permission_id: permId },
        },
        update: {}, // do nothing if already exists
        create: {
          role_id: roleId,
          permission_id: permId,
        },
      });
    }
  }

  console.log('✅ All role-permission mappings ensured');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding RolePermissions:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
