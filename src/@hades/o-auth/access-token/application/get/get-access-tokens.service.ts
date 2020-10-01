import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';

@Injectable()
export class GetAccessTokensService
{
    constructor(
        private readonly repository: IAccessTokenRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<OAuthAccessToken[]>
    {        
        return await this.repository.get(queryStatement);
    }
}