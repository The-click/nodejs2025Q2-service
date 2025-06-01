import { UUID } from 'crypto';
import { IArtist } from 'src/shared/types/entity';

export class ArtistEntity implements IArtist {
  id: UUID;
  name: string;
  grammy: boolean;

  constructor(artist: ArtistEntity) {
    Object.assign(this, artist);
  }
}
