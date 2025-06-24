import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { UUID } from 'crypto';
import { IsNullOrUUID } from 'src/decorators/is-uuid-or-null';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNullOrUUID()
  artistId: UUID | null; // refers to Artist

  @IsNullOrUUID()
  albumId: UUID | null; // refsers to Album

  @IsNumber()
  @Min(0)
  duration: number; // integer number
}
