import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class TrackModule {}
