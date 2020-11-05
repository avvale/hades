import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';

@Injectable()
export class FindAccessTokenService
{
    constructor(
        private readonly repository: IAccessTokenRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthAccessToken>
    {
        return await this.repository.find(queryStatement, constraint, cQMetadata);
    }
}