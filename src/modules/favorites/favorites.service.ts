import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TrackService } from 'src/modules/track/track.service';
import { AlbumService } from 'src/modules/album/album.service';

import { ArtistService } from 'src/modules/artist/artist.service';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favorite } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {
    this.prisma.favorite.create({
      data: {
        type: 'Track',
      },
    });
    this.prisma.favorite.create({
      data: {
        type: 'Album',
      },
    });
    this.prisma.favorite.create({
      data: {
        type: 'Artist',
      },
    });
  }

  async findAll() {
    const all = await this.prisma.favorite.findMany({
      include: {
        track: true,
        album: true,
        artist: true,
      },
    });
    const tracks = [];
    const albums = [];
    const artists = [];

    all.forEach((entity) => {
      switch (entity.type) {
        case 'Album': {
          albums.push(entity.album);
          break;
        }
        case 'Artist': {
          artists.push(entity.artist);
          break;
        }
        case 'Track': {
          tracks.push(entity.track);
          break;
        }
        default: {
          console.log('Unknown entity ' + entity);
        }
      }
    });

    return { albums, artists, tracks };
  }

  async addTrack(id: UUID) {
    try {
      const isChecked = await this.checkEntity(id, 'track');

      if (!isChecked) {
        return 'The track is already in favorites';
      }

      await this.prisma.favorite.create({
        data: {
          type: 'Track',
          track: {
            connect: { id },
          },
        },
      });

      return 'Track added in favorites';
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Track not found', {
          cause: new Error(),
          description: 'Track not found',
        });
      }

      throw new Error(error);
    }
  }

  async deleteTrack(id: UUID) {
    const findedTrack = await this.prisma.favorite.findFirst({
      where: {
        trackId: id,
        type: 'Track',
      },
    });

    if (!findedTrack) {
      throw new NotFoundException('Track not found in favorites', {
        cause: new Error(),
        description: 'Track not found in favorites',
      });
    }

    return this.prisma.favorite.delete({ where: { id: findedTrack.id } });
  }

  async addAlbum(id: UUID) {
    try {
      const isChecked = await this.checkEntity(id, 'album');

      if (!isChecked) {
        return 'The album is already in favorites';
      }

      await this.prisma.favorite.create({
        data: {
          type: 'Album',
          album: {
            connect: { id },
          },
        },
      });

      return 'Album added in favorites';
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Album not found', {
          cause: new Error(),
          description: 'Album not found',
        });
      }

      throw new Error(error);
    }
  }

  async deleteAlbum(id: UUID) {
    const findedAlbum = await this.prisma.favorite.findFirst({
      where: {
        albumId: id,
        type: 'Album',
      },
    });

    if (!findedAlbum) {
      throw new NotFoundException('Album not found in favorites', {
        cause: new Error(),
        description: 'Album not found in favorites',
      });
    }

    return this.prisma.favorite.delete({ where: { id: findedAlbum.id } });
  }

  async addArtist(id: UUID) {
    try {
      const isChecked = await this.checkEntity(id, 'artist');

      if (!isChecked) {
        return 'The artist is already in favorites';
      }

      await this.prisma.favorite.create({
        data: {
          type: 'Artist',
          artist: {
            connect: { id },
          },
        },
      });

      return 'Artist added in favorites';
    } catch (error) {
      if (error.status === 404) {
        throw new UnprocessableEntityException('Album not found', {
          cause: new Error(),
          description: 'Album not found',
        });
      }

      throw new Error(error);
    }
  }

  async deleteArtist(id: UUID) {
    const findedArtist = await this.prisma.favorite.findFirst({
      where: {
        artistId: id,
        type: 'Artist',
      },
    });

    if (!findedArtist) {
      throw new NotFoundException('Artist not found in favorites', {
        cause: new Error(),
        description: 'Artist not found in favorites',
      });
    }

    return this.prisma.favorite.delete({ where: { id: findedArtist.id } });
  }

  async checkEntity(id: UUID, entity: 'artist' | 'album' | 'track') {
    let findedEntity: undefined | Favorite;
    switch (entity) {
      case 'album': {
        await this.albumService.findOne(id);
        findedEntity = await this.prisma.favorite.findFirst({
          where: {
            albumId: id,
            type: 'Album',
          },
        });
        break;
      }
      case 'track': {
        await this.trackService.findOne(id);
        findedEntity = await this.prisma.favorite.findFirst({
          where: {
            trackId: id,
            type: 'Track',
          },
        });
        break;
      }
      case 'artist': {
        await this.artistService.findOne(id);
        findedEntity = await this.prisma.favorite.findFirst({
          where: {
            artistId: id,
            type: 'Artist',
          },
        });
        break;
      }
      default: {
        console.log('Unknown entity ' + entity);
        throw new UnprocessableEntityException('Unknown entity', {
          cause: new Error(),
          description: 'Unknown entity',
        });
      }
    }

    if (findedEntity) {
      return false;
    }

    return true;
  }
}
