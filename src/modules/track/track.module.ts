import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { AlbumModule } from 'src/modules/album/album.module';
import { ArtistModule } from 'src/modules/artist/artist.module';
import { FavoritesModule } from 'src/modules/favorites/favorites.module';

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
