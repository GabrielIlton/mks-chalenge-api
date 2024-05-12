import { PartialType } from '@nestjs/mapped-types';

import { CreateAccountDTO } from './CreateAccount.dto';

export class UpdateAccountDTO extends PartialType(CreateAccountDTO) {}
