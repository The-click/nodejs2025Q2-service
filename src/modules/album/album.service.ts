import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
// import { AlbumEntity } from './entities/album.entity';
import { UUID } from 'crypto';
import { FavoritesService } from 'src/modules/favorites/favorites.service';
import { ArtistService } from 'src/modules/artist/artist.service';
import { TrackService } from 'src/modules/track/track.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  // private readonly albums: AlbumEntity[] = [
  //   new AlbumEntity({
  //     id: crypto.randomUUID(),
  //     name: 'Artist',
  //     year: 2025,
  //     artistId: crypto.randomUUID(),
  //   }),
  // ];

  async create(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: UUID) {
    const findedAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!findedAlbum) {
      throw new NotFoundException('Album not found', {
        cause: new Error(),
        description: 'Album not found',
      });
    }

    return findedAlbum;
  }

  async update(id: UUID, updateAlbumDto: UpdateAlbumDto) {
    const findedAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!findedAlbum) {
      throw new NotFoundException('Album not found', {
        cause: new Error(),
        description: 'Album not found',
      });
    }

    return this.prisma.album.update({ where: { id }, data: updateAlbumDto });
  }

  // async setNullArtist(artistId: string) {
  //   await this.prisma.album.updateMany({
  //     where: { artistId: { equals: artistId } },
  //     data: { artistId: null },
  //   });
  // }

  async remove(id: UUID) {
    const findedAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!findedAlbum) {
      throw new NotFoundException('Album not found', {
        cause: new Error(),
        description: 'Album not found',
      });
    }

    // await this.favoriteService.cascadeDelete(id, 'album');
    // await this.trackService.setNullAlbum(id);

    return this.prisma.album.delete({ where: { id } });
  }
}
