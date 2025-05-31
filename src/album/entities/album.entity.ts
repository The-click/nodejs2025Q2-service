import { UUID } from 'crypto';

export class AlbumEntity {
  id: UUID; // uuid v4
  name: string;
  year: number;
  artistId: UUID | null; // refers to Artist

  constructor(album: AlbumEntity) {
    Object.assign(this, album);
  }
}
