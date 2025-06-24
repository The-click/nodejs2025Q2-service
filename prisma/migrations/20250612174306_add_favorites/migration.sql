/*
  Warnings:

  - You are about to drop the column `albumId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `Favorite` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_trackId_fkey";

-- DropIndex
DROP INDEX "Favorite_artistId_albumId_trackId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "albumId",
DROP COLUMN "artistId",
DROP COLUMN "trackId";

-- DropEnum
DROP TYPE "FavoriteType";

-- CreateTable
CREATE TABLE "_favs_artists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_favs_artists_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_favs_albums" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_favs_albums_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_favs_tracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_favs_tracks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_favs_artists_B_index" ON "_favs_artists"("B");

-- CreateIndex
CREATE INDEX "_favs_albums_B_index" ON "_favs_albums"("B");

-- CreateIndex
CREATE INDEX "_favs_tracks_B_index" ON "_favs_tracks"("B");

-- AddForeignKey
ALTER TABLE "_favs_artists" ADD CONSTRAINT "_favs_artists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favs_artists" ADD CONSTRAINT "_favs_artists_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favs_albums" ADD CONSTRAINT "_favs_albums_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favs_albums" ADD CONSTRAINT "_favs_albums_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favs_tracks" ADD CONSTRAINT "_favs_tracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favs_tracks" ADD CONSTRAINT "_favs_tracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
