import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AccountEntity } from '../../infra/entities/account.entity';

import { UpdateAccountDTO } from './dto/UpdateAccount.dto';
import { CreateAccountDTO } from './dto/CreateAccount.dto';
import { ListAccountsDTO } from './dto/ListAccounts.dto';

import Errors from 'src/common/HTTP/Errors';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async createAccount({ password, email, name }: CreateAccountDTO) {
    const accountAlreadyExists = await this.accountRepository.findOne({
      where: { email },
    });

    if (accountAlreadyExists)
      throw Errors.generic.alreadyExists({ field: 'conta' });

    const accountEntity = new AccountEntity();
    Object.assign(accountEntity, { password, email, name } as AccountEntity);

    return this.accountRepository.save(accountEntity);
  }

  async listAccounts() {
    const accountsSalvos = await this.accountRepository.find();
    const accountsLista = accountsSalvos.map(
      (account) => new ListAccountsDTO(account.id, account.name, account.email),
    );

    return accountsLista;
  }

  async findByEmail(email: string) {
    const checkEmail = await this.accountRepository.findOne({
      where: { email },
    });
    if (!checkEmail) throw Errors.generic.notFound({ entity: 'email' });

    return checkEmail;
  }

  async updateAccount(accountId: string, { email, name }: UpdateAccountDTO) {
    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) throw Errors.generic.notFound({ entity: 'conta' });

    Object.assign(account, { email, name } as AccountEntity);

    return this.accountRepository.save(account);
  }

  async deleteAccount(accountId: string) {
    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) throw Errors.generic.notFound({ entity: 'conta' });

    await this.accountRepository.delete(account.id);

    return account;
  }
}
