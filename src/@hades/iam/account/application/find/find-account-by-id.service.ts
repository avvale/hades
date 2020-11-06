import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAccountRepository } from './../../domain/account.repository';
import { IamAccount } from './../../domain/account.aggregate';
import { AccountId } from './../../domain/value-objects';

@Injectable()
export class FindAccountByIdService
{
    constructor(
        private readonly repository: IAccountRepository,
    ) {}

    public async main(id: AccountId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamAccount>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}