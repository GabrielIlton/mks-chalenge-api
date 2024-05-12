import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @ApiProperty()
  password: string;
}
