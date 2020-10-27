import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IAccountRepository } from './../../domain/account.repository';
import { IamAccount } from './../../domain/account.aggregate';

@Injectable()
export class FindAccountService
{
    constructor(
        private readonly repository: IAccountRepository,
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<IamAccount>
    {
        return await this.repository.find(queryStatement);
    }
}