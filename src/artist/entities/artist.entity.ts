import { UUID } from 'crypto';

export class ArtistEntity {
  id: UUID;
  name: string;
  grammy: boolean;

  constructor(artist: ArtistEntity) {
    Object.assign(this, artist);
  }
}
