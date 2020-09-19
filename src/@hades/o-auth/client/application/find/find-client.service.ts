import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IClientRepository } from './../../domain/client.repository';
import { OAuthClient } from './../../domain/client.aggregate';

@Injectable()
export class FindClientService
{
    constructor(
        private readonly repository: IClientRepository
    ) {}

    public async main(queryStatement: QueryStatement): Promise<OAuthClient>
    {        
        return await this.repository.find(queryStatement);
    }
}