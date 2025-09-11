import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { role_name: 'Creator' },
      { role_name: 'Admin' },
      { role_name: 'Viewer' },
    ],
    skipDuplicates: true, // avoids error if already inserted
  });
}

main()
  .then(() => {
    console.log("✅ Roles inserted successfully");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
