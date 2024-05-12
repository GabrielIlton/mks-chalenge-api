import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { MovieEntity } from '../../infra/entities/movie.entity';

import { CreateMovieDTO } from './dto/CreateMovie.dto';
import { UpdateMovieDTO } from './dto/UpdateMovie.dto';
import { ListMoviesDTO } from './dto/ListMovies.dto';

import Errors from 'src/common/HTTP/Errors';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async createMovie({
    release_date: releaseDate,
    description,
    duration,
    gender,
    name,
  }: CreateMovieDTO) {
    const movieAlreadyExists = await this.movieRepository.findOne({
      where: { name },
    });

    if (movieAlreadyExists)
      throw Errors.generic.alreadyExists({ field: 'filme' });

    const movieEntity = new MovieEntity();
    Object.assign(movieEntity, {
      release_date: new Date(releaseDate),
      duration: Number(duration),
      gender: gender,
      description,
      name,
    } as MovieEntity);

    return this.movieRepository.save(movieEntity);
  }

  async listMovies() {
    const movies = await this.movieRepository.find();
    const moviesMapped = movies.map(
      (movie) =>
        new ListMoviesDTO(
          movie.id,
          movie.name,
          movie.duration,
          movie.release_date,
          movie.description,
          movie.gender,
        ),
    );

    return moviesMapped;
  }

  async updateMovie(
    movieId: string,
    {
      release_date: releaseDate,
      description,
      duration,
      gender,
      name,
    }: UpdateMovieDTO,
  ) {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw Errors.generic.notFound({ entity: 'filme' });

    Object.assign(movie, {
      duration: Number(duration),
      release_date: releaseDate,
      description,
      gender,
      name,
    } as MovieEntity);

    return this.movieRepository.save(movie);
  }

  async deleteMovie(movieId: string) {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) throw Errors.generic.notFound({ entity: 'filme' });

    await this.movieRepository.delete(movie.id);

    return movie;
  }
}
