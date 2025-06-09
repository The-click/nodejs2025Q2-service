/*
  Warnings:

  - You are about to drop the `User1` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User1";

-- CreateTable
CREATE TABLE "Userd" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Userd_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Userd_login_key" ON "Userd"("login");
