import { UUID } from 'crypto';

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class IArtist {
  id: string;
  name: string;
  grammy: boolean;
}

export class ITrack {
  id: UUID; // uuid v4
  name: string;
  artistId: UUID | null; // refers to Artist
  albumId: UUID | null; // refers to Album
  duration: number; // integer number
}

export class IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
