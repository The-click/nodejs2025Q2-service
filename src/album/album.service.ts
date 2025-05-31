import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { UUID } from 'crypto';

@Injectable()
export class AlbumService {
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

  remove(id: UUID) {
    const findeAlbum = this.findOne(id);

    return this.albums.splice(
      this.albums.findIndex((album) => album.id === findeAlbum.id),
      1,
    );
  }
}
