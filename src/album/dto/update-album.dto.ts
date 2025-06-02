import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { UUID } from 'crypto';
import { IsNullOrUUID } from 'src/decorators/is-uuid-or-null';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  year: number;

  @IsNullOrUUID()
  artistId: UUID | null;
}
