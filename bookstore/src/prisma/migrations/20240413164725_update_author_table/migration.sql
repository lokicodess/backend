/*
  Warnings:

  - Added the required column `password` to the `author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "author" ADD COLUMN     "password" TEXT NOT NULL;
