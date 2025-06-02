import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class ArtistModule {}
