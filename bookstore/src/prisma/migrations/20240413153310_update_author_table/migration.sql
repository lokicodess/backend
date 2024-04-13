/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "author" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "author_email_key" ON "author"("email");
