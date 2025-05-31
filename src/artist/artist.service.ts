import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { UUID } from 'crypto';

@Injectable()
export class ArtistService {
  private readonly artists: ArtistEntity[] = [
    new ArtistEntity({
      id: crypto.randomUUID(),
      name: 'Artist',
      grammy: true,
    }),
  ];

  create(ArtistDto: ArtistDto) {
    const newArtist = new ArtistEntity({
      ...ArtistDto,
      id: crypto.randomUUID(),
    });

    this.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: UUID) {
    const findedArtist = this.artists.find((artist) => artist.id === id);

    if (!findedArtist) {
      throw new NotFoundException('Artist not found', {
        cause: new Error(),
        description: 'Artist not found',
      });
    }

    return findedArtist;
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto) {
    const findeArtist = this.findOne(id);

    findeArtist.grammy = updateArtistDto.grammy;
    findeArtist.name = updateArtistDto.name;

    return findeArtist;
  }

  remove(id: UUID) {
    const findeArtist = this.findOne(id);

    return this.artists.splice(
      this.artists.findIndex((artist) => artist.id === findeArtist.id),
      1,
    );
  }
}
