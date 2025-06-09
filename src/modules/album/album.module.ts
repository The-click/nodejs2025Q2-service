import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/modules/track/track.module';
import { ArtistModule } from 'src/modules/artist/artist.module';
import { FavoritesModule } from 'src/modules/favorites/favorites.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class AlbumModule {}
