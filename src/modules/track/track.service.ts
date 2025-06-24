import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.track.delete({ where: { id } });
  }
}
