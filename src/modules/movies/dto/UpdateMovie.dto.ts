import { PartialType } from '@nestjs/mapped-types';

import { CreateMovieDTO } from './CreateMovie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
