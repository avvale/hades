import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IUserRepository } from './../../domain/user.repository';
import { IamUser } from './../../domain/user.aggregate';

@Injectable()
export class FindUserService
{
    constructor(
        private readonly repository: IUserRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<IamUser>
    {        
        return await this.repository.find(queryStatement);
    }
}