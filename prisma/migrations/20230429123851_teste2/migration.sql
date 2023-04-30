/*
  Warnings:

  - The `status` column on the `todos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('OPEN', 'WIP', 'COMPLETED');

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "status",
ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'OPEN';
