/*
  Warnings:

  - The `status` column on the `todos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TodoStatus2" AS ENUM ('OPEN', 'WIP', 'COMPLETED');

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "status",
ADD COLUMN     "status" "TodoStatus2" NOT NULL DEFAULT 'OPEN';

-- DropEnum
DROP TYPE "TodoStatus";
