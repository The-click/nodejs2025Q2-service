import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { UUID } from 'crypto';
import { FavoritesService } from 'src/modules/favorites/favorites.service';
import { AlbumService } from 'src/modules/album/album.service';
import { TrackService } from 'src/modules/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  private readonly artists: ArtistEntity[] = [
    new ArtistEntity({
      id: crypto.randomUUID(),
      name: 'Artist',
      grammy: true,
    }),
  ];

  create(ArtistDto: ArtistDto) {
    const newArtist = new ArtistEntity({
      ...ArtistDto,
      id: crypto.randomUUID(),
    });

    this.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: UUID) {
    const findedArtist = this.artists.find((artist) => artist.id === id);

    if (!findedArtist) {
      throw new NotFoundException('Artist not found', {
        cause: new Error(),
        description: 'Artist not found',
      });
    }

    return findedArtist;
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const findeArtist = this.findOne(id);

    findeArtist.grammy = updateArtistDto.grammy;
    findeArtist.name = updateArtistDto.name;

    return findeArtist;
  }

  remove(id: UUID) {
    const findeArtist = this.findOne(id);

    const deletedElement = this.artists.splice(
      this.artists.findIndex((artist) => artist.id === findeArtist.id),
      1,
    );

    this.albumService.setNullArtist(id);
    this.trackService.setNullArtist(id);
    this.favoriteService.cascadeDelete(id, 'artist');

    return deletedElement;
  }
}
