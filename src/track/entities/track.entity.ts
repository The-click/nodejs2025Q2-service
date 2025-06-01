import { UUID } from 'crypto';
import { ITrack } from 'src/shared/types/entity';

export class TrackEntity implements ITrack {
  id: UUID; // uuid v4
  name: string;
  artistId: UUID | null; // refers to Artist
  albumId: UUID | null; // refers to Album
  duration: number; // integer number

  constructor(album: TrackEntity) {
    Object.assign(this, album);
  }
}
