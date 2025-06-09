import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackService } from 'src/modules/track/track.service';
import { AlbumService } from 'src/modules/album/album.service';
import { FavoriteEntity } from './entities/favorite.entity';
import { ArtistService } from 'src/modules/artist/artist.service';
import { UUID } from 'crypto';
import { IAlbum, IArtist, ITrack } from 'src/shared/types/entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  private readonly favorites: FavoriteEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    return this.favorites;
  }

  addTrack(id: UUID) {
    let findedTrack: undefined | ITrack;

    try {
      findedTrack = this.trackService.findOne(id);
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Something bad happened', {
          cause: new Error(),
          description: 'Some error description',
        });
      }

      throw new Error(error);
    }

    this.favorites.tracks.push(findedTrack);

    return 'Track added in favorites';
  }

  deleteTrack(id: UUID) {
    const findedTrack = this.favorites.tracks.find((track) => track.id === id);

    if (!findedTrack) {
      throw new NotFoundException('Track not found in favorites', {
        cause: new Error(),
        description: 'Track not found in favorites',
      });
    }

    return this.favorites.tracks.splice(
      this.favorites.tracks.findIndex((track) => track.id === findedTrack.id),
      1,
    );
  }

  async addAlbum(id: UUID) {
    let findedAlbum: undefined | IAlbum;

    try {
      findedAlbum = await this.albumService.findOne(id);
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Something bad happened', {
          cause: new Error(),
          description: 'Some error description',
        });
      }

      throw new Error(error);
    }

    this.favorites.albums.push(findedAlbum);

    return 'Album added in favorites';
  }

  deleteAlbum(id: UUID) {
    const findedAlbum = this.favorites.albums.find((album) => album.id === id);

    if (!findedAlbum) {
      throw new NotFoundException('Album not found in favorites', {
        cause: new Error(),
        description: 'Album not found in favorites',
      });
    }

    return this.favorites.albums.splice(
      this.favorites.albums.findIndex((album) => album.id === findedAlbum.id),
      1,
    );
  }

  async addArtist(id: UUID) {
    let findedArtist: undefined | IArtist;

    try {
      findedArtist = await this.artistService.findOne(id);
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Something bad happened', {
          cause: new Error(),
          description: 'Some error description',
        });
      }

      throw new Error(error);
    }

    this.favorites.artists.push(findedArtist);

    return 'Artist added in favorites';
  }

  deleteArtist(id: UUID) {
    const findedArtist = this.favorites.artists.find(
      (artist) => artist.id === id,
    );

    if (!findedArtist) {
      throw new NotFoundException('Album not found in favorites', {
        cause: new Error(),
        description: 'Album not found in favorites',
      });
    }

    return this.favorites.artists.splice(
      this.favorites.artists.findIndex(
        (artist) => artist.id === findedArtist.id,
      ),
      1,
    );
  }

  cascadeDelete(id: UUID, entity: 'artist' | 'album' | 'track') {
    switch (entity) {
      case 'album': {
        this.favorites.albums.splice(
          this.favorites.albums.findIndex((albums) => albums.id === id),
          1,
        );
        break;
      }

      case 'artist': {
        this.favorites.artists.splice(
          this.favorites.artists.findIndex((artist) => artist.id === id),
          1,
        );
        break;
      }
      case 'track': {
        this.favorites.tracks.splice(
          this.favorites.tracks.findIndex((track) => track.id === id),
          1,
        );
        break;
      }

      default: {
        console.log(`Unexpected entity ${entity}`);
      }
    }
  }
}
