/*
  Warnings:

  - You are about to drop the `_favs_albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favs_artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favs_tracks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[artistId,albumId,trackId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FavoriteType" AS ENUM ('ARTIST', 'ALBUM', 'TRACK');

-- DropForeignKey
ALTER TABLE "_favs_albums" DROP CONSTRAINT "_favs_albums_A_fkey";

-- DropForeignKey
ALTER TABLE "_favs_albums" DROP CONSTRAINT "_favs_albums_B_fkey";

-- DropForeignKey
ALTER TABLE "_favs_artists" DROP CONSTRAINT "_favs_artists_A_fkey";

-- DropForeignKey
ALTER TABLE "_favs_artists" DROP CONSTRAINT "_favs_artists_B_fkey";

-- DropForeignKey
ALTER TABLE "_favs_tracks" DROP CONSTRAINT "_favs_tracks_A_fkey";

-- DropForeignKey
ALTER TABLE "_favs_tracks" DROP CONSTRAINT "_favs_tracks_B_fkey";

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "albumId" TEXT,
ADD COLUMN     "artistId" TEXT,
ADD COLUMN     "trackId" TEXT;

-- DropTable
DROP TABLE "_favs_albums";

-- DropTable
DROP TABLE "_favs_artists";

-- DropTable
DROP TABLE "_favs_tracks";

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_artistId_albumId_trackId_key" ON "Favorite"("artistId", "albumId", "trackId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;
