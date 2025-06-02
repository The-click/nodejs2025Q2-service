import { IAlbum, IArtist, IFavorites, ITrack } from 'src/shared/types/entity';

export class FavoriteEntity implements IFavorites {
  artists: IArtist[]; // favorite artists ids
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids

  constructor(favorite: FavoriteEntity) {
    Object.assign(this, favorite);
  }
}
