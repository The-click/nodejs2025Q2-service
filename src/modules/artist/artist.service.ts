import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.artist.delete({ where: { id } });
  }
}
