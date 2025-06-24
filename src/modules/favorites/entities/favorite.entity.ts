import { IAlbum, IArtist, IFavorites, ITrack } from 'src/shared/types/entity';

export class FavoriteEntity implements IFavorites {
  artistId: string; // favorite artists ids
  albumId: string; // favorite albums ids
  trackId: string; // favorite tracks ids
  id: string;
  type: 'Album' | 'Artist' | 'Track';

  constructor(favorite: FavoriteEntity) {
    Object.assign(this, favorite);
  }
}
