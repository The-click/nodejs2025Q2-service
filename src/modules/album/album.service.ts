import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { UUID } from 'crypto';
import { FavoritesService } from 'src/modules/favorites/favorites.service';
import { ArtistService } from 'src/modules/artist/artist.service';
import { TrackService } from 'src/modules/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  private readonly albums: AlbumEntity[] = [
    new AlbumEntity({
      id: crypto.randomUUID(),
      name: 'Artist',
      year: 2025,
      artistId: crypto.randomUUID(),
    }),
  ];

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new AlbumEntity({
      ...createAlbumDto,
      id: crypto.randomUUID(),
    });

    this.albums.push(newAlbum);

    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: UUID) {
    const findedAlbum = this.albums.find((album) => album.id === id);

    if (!findedAlbum) {
      throw new NotFoundException('Album not found', {
        cause: new Error(),
        description: 'Album not found',
      });
    }

    return findedAlbum;
  }

  update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    const findeAlbum = this.findOne(id);

    Object.keys(updateAlbumDto).forEach(
      (keyAlbum) => (findeAlbum[keyAlbum] = updateAlbumDto[keyAlbum]),
    );

    return findeAlbum;
  }

  setNullArtist(artistId: UUID) {
    this.albums.forEach((album) => {
      if (album.artistId !== artistId) {
        return;
      }

      album.artistId = null;
    });
  }

  remove(id: UUID) {
    const findeAlbum = this.findOne(id);

    const deletedElement = this.albums.splice(
      this.albums.findIndex((album) => album.id === findeAlbum.id),
      1,
    );

    this.favoriteService.cascadeDelete(id, 'album');
    this.trackService.setNullAlbum(id);

    return deletedElement;
  }
}
