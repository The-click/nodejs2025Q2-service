/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeFavorite" AS ENUM ('Album', 'Track', 'Artist');

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "type" "TypeFavorite" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_type_key" ON "Favorite"("type");
