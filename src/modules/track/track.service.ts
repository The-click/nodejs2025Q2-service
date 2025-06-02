import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { UUID } from 'crypto';
import { AlbumService } from 'src/modules/album/album.service';
import { ArtistService } from 'src/modules/artist/artist.service';
import { FavoritesService } from 'src/modules/favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  private readonly tracks: TrackEntity[] = [
    new TrackEntity({
      id: crypto.randomUUID(),
      name: 'Track',
      artistId: crypto.randomUUID(),
      albumId: crypto.randomUUID(),
      duration: 100,
    }),
  ];

  create(createTrackDto: CreateTrackDto) {
    const newTruck = new TrackEntity({
      ...createTrackDto,
      id: crypto.randomUUID(),
    });

    this.tracks.push(newTruck);

    return newTruck;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: UUID) {
    const findedTrack = this.tracks.find((track) => track.id === id);

    if (!findedTrack) {
      throw new NotFoundException('Track not found', {
        cause: new Error(),
        description: 'Track not found',
      });
    }

    return findedTrack;
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const findedTrack = this.findOne(id);

    Object.keys(updateTrackDto).forEach(
      (keyTrack) => (findedTrack[keyTrack] = updateTrackDto[keyTrack]),
    );

    return findedTrack;
  }

  setNullArtist(artistId: UUID) {
    this.tracks.forEach((track) => {
      if (track.artistId !== artistId) {
        return;
      }

      track.artistId = null;
    });
  }

  setNullAlbum(albumId: UUID) {
    this.tracks.forEach((track) => {
      if (track.albumId !== albumId) {
        return;
      }

      track.albumId = null;
    });
  }

  remove(id: UUID) {
    const findedTrack = this.findOne(id);

    const deletedElement = this.tracks.splice(
      this.tracks.findIndex((album) => album.id === findedTrack.id),
      1,
    );

    this.favoriteService.cascadeDelete(id, 'track');

    return deletedElement;
  }
}
