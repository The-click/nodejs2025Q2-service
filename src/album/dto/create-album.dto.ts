import { IsNotEmpty, IsPositive, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  year: number;

  @IsUUID()
  @IsNotEmpty()
  artistId: UUID;
}
