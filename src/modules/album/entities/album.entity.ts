import { UUID } from 'crypto';
import { IAlbum } from 'src/shared/types/entity';

export class AlbumEntity implements IAlbum {
  id: UUID; // uuid v4
  name: string;
  year: number;
  artistId: UUID | null; // refers to Artist

  constructor(album: AlbumEntity) {
    Object.assign(this, album);
  }
}
