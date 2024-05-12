import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsDateString,
} from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @IsString({ message: 'Tipo inválido para o nome' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'Duração é obrigatório.' })
  @IsString({ message: 'Tipo inválido para duração' })
  @IsNumberString()
  @ApiProperty()
  duration: string;

  @IsNotEmpty({ message: 'Data de lançamento é obrigatório.' })
  @IsDateString({ message: 'Data de lançamento inválida' })
  @ApiProperty()
  release_date: Date;

  @IsNotEmpty({ message: 'Descrição é obrigatório.' })
  @ApiProperty()
  description: string;

  @IsNotEmpty({ message: 'Gênero é obrigatório.' })
  @ApiProperty()
  gender: string;
}
