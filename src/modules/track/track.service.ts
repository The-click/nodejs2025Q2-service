import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
// import { TrackEntity } from './entities/track.entity';
import { UUID } from 'crypto';
import { AlbumService } from 'src/modules/album/album.service';
import { ArtistService } from 'src/modules/artist/artist.service';
import { FavoritesService } from 'src/modules/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  // private readonly tracks: TrackEntity[] = [
  //   new TrackEntity({
  //     id: crypto.randomUUID(),
  //     name: 'Track',
  //     artistId: crypto.randomUUID(),
  //     albumId: crypto.randomUUID(),
  //     duration: 100,
  //   }),
  // ];

  create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: UUID) {
    const findedTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!findedTrack) {
      throw new NotFoundException('Track not found', {
        cause: new Error(),
        description: 'Track not found',
      });
    }

    return findedTrack;
  }

  async update(id: UUID, updateTrackDto: UpdateTrackDto) {
    const findedTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!findedTrack) {
      throw new NotFoundException('Track not found', {
        cause: new Error(),
        description: 'Track not found',
      });
    }

    return this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
  }

  async remove(id: UUID) {
    const findedTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!findedTrack) {
      throw new NotFoundException('Track not found', {
        cause: new Error(),
        description: 'Track not found',
      });
    }

    // await this.favoriteService.cascadeDelete(id, 'track');

    return this.prisma.track.delete({ where: { id } });
  }
}
