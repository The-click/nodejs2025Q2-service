import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import { ArtistEntity } from './entities/artist.entity';
import { UUID } from 'crypto';
import { FavoritesService } from 'src/modules/favorites/favorites.service';
import { AlbumService } from 'src/modules/album/album.service';
import { TrackService } from 'src/modules/track/track.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  // private readonly artists: ArtistEntity[] = [
  //   new ArtistEntity({
  //     id: crypto.randomUUID(),
  //     name: 'Artist',
  //     grammy: true,
  //   }),
  // ];

  async create(ArtistDto: ArtistDto) {
    return this.prisma.artist.create({ data: ArtistDto });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: UUID) {
    const findedArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!findedArtist) {
      throw new NotFoundException('Artist not found', {
        cause: new Error(),
        description: 'Artist not found',
      });
    }

    return findedArtist;
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const findedArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!findedArtist) {
      throw new NotFoundException('Artist not found', {
        cause: new Error(),
        description: 'Artist not found',
      });
    }

    return this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  async remove(id: UUID) {
    const findedArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!findedArtist) {
      throw new NotFoundException('Artist not found', {
        cause: new Error(),
        description: 'Artist not found',
      });
    }

    // await this.albumService.setNullArtist(id);
    // await this.trackService.setNullArtist(id);
    // await this.favoriteService.cascadeDelete(id, 'artist');

    return this.prisma.artist.delete({ where: { id } });
  }
}
