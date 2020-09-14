import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';

@Injectable()
export class FindRefreshTokenService
{
    constructor(
        private readonly repository: IRefreshTokenRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<OAuthRefreshToken>
    {        
        return await this.repository.find(queryStatements);
    }
}