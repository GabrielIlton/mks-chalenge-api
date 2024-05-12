import {
  Controller,
  Delete,
  Param,
  Body,
  Post,
  Get,
  Put,
} from '@nestjs/common';

import { UpdateAccountDTO } from './dto/UpdateAccount.dto';
import { CreateAccountDTO } from './dto/CreateAccount.dto';
import { ListAccountsDTO } from './dto/ListAccounts.dto';

import { AccountService } from './account.service';

import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts')
@Controller('/accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async createAccount(@Body() body: CreateAccountDTO) {
    const { email, name, password } = body;
    const accountCreated = await this.accountService.createAccount({
      password,
      email,
      name,
    });

    return {
      message: 'Conta criada com sucesso',
      account: new ListAccountsDTO(
        accountCreated.id,
        accountCreated.name,
        accountCreated.email,
      ),
    };
  }

  @Get()
  async listAccounts() {
    const accounts = await this.accountService.listAccounts();

    return {
      message: 'Contas obtidas com sucesso.',
      accounts: accounts,
    };
  }

  @ApiBody({
    schema: {
      example: {
        name: 'Gabriel Ilton',
        email: 'gmail@gmail.com',
      },
    },
  })
  @ApiParam({ name: 'id' })
  @Put('/:id')
  async updateAccount(@Param('id') id: string, @Body() body) {
    const { email, name }: UpdateAccountDTO = body;

    const accountUpdated = await this.accountService.updateAccount(id, {
      email,
      name,
    });

    return {
      message: 'Conta atualizada.',
      account: accountUpdated,
    };
  }

  @Delete('/:id')
  async deleteAccount(@Param('id') id: string) {
    await this.accountService.deleteAccount(id);

    return { message: 'Conta deletada.' };
  }
}
