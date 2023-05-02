-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('OPEN', 'WIP', 'COMPLETED');

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'OPEN',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
