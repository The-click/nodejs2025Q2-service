import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

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

  async remove(id: UUID) {
    const findedAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!findedAlbum) {
      throw new NotFoundException('Album not found', {
        cause: new Error(),
        description: 'Album not found',
      });
    }

    return this.prisma.album.delete({ where: { id } });
  }
}
