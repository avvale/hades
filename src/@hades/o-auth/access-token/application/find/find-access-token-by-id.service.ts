import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';
import { AccessTokenId } from './../../domain/value-objects';

@Injectable()
export class FindAccessTokenByIdService
{
    constructor(
        private readonly repository: IAccessTokenRepository,
    ) {}

    public async main(id: AccessTokenId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthAccessToken>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}