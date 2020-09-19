import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';

@Injectable()
export class FindRefreshTokenService
{
    constructor(
        private readonly repository: IRefreshTokenRepository
    ) {}

    public async main(queryStatement: QueryStatement): Promise<OAuthRefreshToken>
    {        
        return await this.repository.find(queryStatement);
    }
}