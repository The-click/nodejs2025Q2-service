import { UUID } from 'crypto';

export class TrackEntity {
  id: UUID; // uuid v4
  name: string;
  artistId: UUID | null; // refers to Artist
  albumId: UUID | null; // refers to Album
  duration: number; // integer number

  constructor(album: TrackEntity) {
    Object.assign(this, album);
  }
}
