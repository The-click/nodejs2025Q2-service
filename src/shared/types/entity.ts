import { UUID } from 'crypto';

export interface IAlbum {
  id: UUID; // uuid v4
  name: string;
  year: number;
  artistId: UUID | null; // refers to Artist
}

export class IArtist {
  id: UUID;
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
  id: UUID;
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
