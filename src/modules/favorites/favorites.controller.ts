import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUID } from 'crypto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  createTrack(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  createArtist(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.favoritesService.deleteArtist(id);
  }
}
