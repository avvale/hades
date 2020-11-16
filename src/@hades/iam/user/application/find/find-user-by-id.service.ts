import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IUserRepository } from './../../domain/user.repository';
import { IamUser } from './../../domain/user.aggregate';
import { UserId } from './../../domain/value-objects';

@Injectable()
export class FindUserByIdService
{
    constructor(
        private readonly repository: IUserRepository,
    ) {}

    public async main(id: UserId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamUser>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}