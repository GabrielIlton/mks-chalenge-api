import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAccountDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @ApiProperty({ description: 'Seu nome', example: 'Gabriel Ilton' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail é inválido' })
  @ApiProperty({
    description: 'Seu email',
    example: 'gmail@gmail.com',
  })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  @ApiProperty({ description: 'Sua senha', example: 'senha123' })
  password: string;
}
