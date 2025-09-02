/*
  Warnings:

  - You are about to drop the column `role_id` on the `permissions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."permissions" DROP CONSTRAINT "permissions_role_id_fkey";

-- AlterTable
ALTER TABLE "public"."permissions" DROP COLUMN "role_id";

-- CreateTable
CREATE TABLE "public"."roles_permissions" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,

    CONSTRAINT "roles_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateIndex
CREATE INDEX "roles_permissions_permission_id_idx" ON "public"."roles_permissions"("permission_id");

-- AddForeignKey
ALTER TABLE "public"."roles_permissions" ADD CONSTRAINT "roles_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."roles_permissions" ADD CONSTRAINT "roles_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
