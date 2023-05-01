/*
  Warnings:

  - Changed the type of `status` on the `todos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('OPEN', 'WIP', 'COMPLETED');

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "status",
ADD COLUMN     "status" "TodoStatus" NOT NULL;

-- DropEnum
DROP TYPE "TodoStatus2";
