import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';

@Injectable()
export class PaginateAccessTokensService
{
    constructor(
        private readonly repository: IAccessTokenRepository
    ) {}

    public async main(queryStatement: QueryStatement, constraint: QueryStatement = {}): Promise<Pagination<OAuthAccessToken>>
    {        
        return await this.repository.paginate(queryStatement, constraint);
    }
}