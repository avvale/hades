import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';

@Injectable()
export class GetAccessTokensService
{
    constructor(
        private readonly repository: IAccessTokenRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<OAuthAccessToken[]>
    {        
        return await this.repository.get(queryStatements);
    }
}