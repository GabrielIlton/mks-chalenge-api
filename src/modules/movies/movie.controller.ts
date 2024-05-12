import { ApiBearerAuth, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  Controller,
  // UseGuards,
  Delete,
  Param,
  Post,
  Body,
  Get,
  Put,
} from '@nestjs/common';

import { UpdateMovieDTO } from './dto/UpdateMovie.dto';
import { CreateMovieDTO } from './dto/CreateMovie.dto';

import { MovieService } from './movie.service';

// import { AuthGuard } from '../auth/auth.guard';

// @UseGuards(AuthGuard)
@ApiTags('Movies')
@ApiBearerAuth()
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie(@Body() body: CreateMovieDTO) {
    const movieCreated = await this.movieService.createMovie(body);

    return {
      message: 'Filme criado com sucesso.',
      movie: movieCreated,
    };
  }

  @Get()
  async listMovies() {
    const movies = await this.movieService.listMovies();

    return {
      message: 'Filmes obtidos com sucesso.',
      movies,
    };
  }

  @ApiBody({
    schema: {
      example: {
        release_date: new Date(),
        description: 'Filme de aventura com amigos',
        duration: 100,
        gender: 'Aventura',
        name: 'Gente Grande',
      },
    },
  })
  @ApiParam({ name: 'id' })
  @Put(':id')
  async updateMovie(@Param('id') movieId, @Body() body) {
    const {
      release_date: releaseDate,
      description,
      duration,
      gender,
      name,
    }: UpdateMovieDTO = body;

    const movieUpdated = await this.movieService.updateMovie(movieId, {
      release_date: releaseDate,
      description,
      duration,
      gender,
      name,
    });

    return { message: 'Filme atualizado.', movie: movieUpdated };
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  async deleteMovie(@Param('id') movieId) {
    await this.movieService.deleteMovie(movieId);

    return { message: 'Filme deletado.' };
  }
}
