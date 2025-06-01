import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TrackModule, AlbumModule, ArtistModule],
})
export class FavoritesModule {}
