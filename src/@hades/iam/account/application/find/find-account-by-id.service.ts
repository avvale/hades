import { Injectable } from '@nestjs/common';
import { IAccountRepository } from './../../domain/account.repository';
import { IamAccount } from './../../domain/account.aggregate';
import { AccountId } from './../../domain/value-objects';

@Injectable()
export class FindAccountByIdService
{
    constructor(
        private readonly repository: IAccountRepository
    ) {}

    public async main(id: AccountId): Promise<IamAccount>
    {
        return await this.repository.findById(id);
    }
}