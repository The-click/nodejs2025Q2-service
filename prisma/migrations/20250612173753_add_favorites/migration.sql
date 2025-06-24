/*
  Warnings:

  - You are about to drop the column `artistId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_artistId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "artistId",
ADD COLUMN     "artist_id" TEXT;

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "albumId",
DROP COLUMN "artistId",
ADD COLUMN     "album_id" TEXT,
ADD COLUMN     "artist_id" TEXT;

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "Album" ADD CONSTRAINT "Album_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
