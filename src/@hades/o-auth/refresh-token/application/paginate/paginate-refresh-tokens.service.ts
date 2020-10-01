import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';

@Injectable()
export class PaginateRefreshTokensService
{
    constructor(
        private readonly repository: IRefreshTokenRepository
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement): Promise<Pagination<OAuthRefreshToken>>
    {        
        return await this.repository.paginate(queryStatement, constraint);
    }
}