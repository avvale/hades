import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';

@Injectable()
export class FindRefreshTokenService
{
    constructor(
        private readonly repository: IRefreshTokenRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthRefreshToken>
    {
        return await this.repository.find(queryStatement, constraint, cQMetadata);
    }
}