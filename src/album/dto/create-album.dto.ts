import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UUID } from 'crypto';
import { IsNullOrUUID } from 'src/decorators/is-uuid-or-null';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  year: number;

  @IsNullOrUUID()
  artistId: UUID | null;
}
