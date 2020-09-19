import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IClientRepository } from './../../domain/client.repository';
import { OAuthClient } from './../../domain/client.aggregate';

@Injectable()
export class PaginateClientsService
{
    constructor(
        private readonly repository: IClientRepository
    ) {}

    public async main(queryStatement: QueryStatement, constraint: QueryStatement = {}): Promise<Pagination<OAuthClient>>
    {        
        return await this.repository.paginate(queryStatement, constraint);
    }
}