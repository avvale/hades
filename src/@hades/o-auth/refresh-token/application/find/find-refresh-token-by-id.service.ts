import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';
import { RefreshTokenId } from './../../domain/value-objects';

@Injectable()
export class FindRefreshTokenByIdService
{
    constructor(
        private readonly repository: IRefreshTokenRepository,
    ) {}

    public async main(id: RefreshTokenId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthRefreshToken>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}