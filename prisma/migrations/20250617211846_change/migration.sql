/*
  Warnings:

  - You are about to drop the `_favs_albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favs_artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favs_tracks` table. If the table is not empty, all the data it contains will be lost.

*/
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
ALTER TABLE "Favorite" ADD COLUMN     "album_id" TEXT,
ADD COLUMN     "artist_id" TEXT,
ADD COLUMN     "track_id" TEXT;

-- DropTable
DROP TABLE "_favs_albums";

-- DropTable
DROP TABLE "_favs_artists";

-- DropTable
DROP TABLE "_favs_tracks";

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;
