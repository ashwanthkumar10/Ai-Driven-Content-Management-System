-- CreateEnum
CREATE TYPE "public"."content_type" AS ENUM ('ARTICLE', 'VIDEO', 'IMAGE');

-- CreateEnum
CREATE TYPE "public"."content_status" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "public"."content" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content_type" "public"."content_type" NOT NULL,
    "metadata" JSONB NOT NULL,
    "status" "public"."content_status" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."content" ADD CONSTRAINT "content_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
