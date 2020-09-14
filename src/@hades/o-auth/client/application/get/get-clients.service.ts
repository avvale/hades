import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IClientRepository } from './../../domain/client.repository';
import { OAuthClient } from './../../domain/client.aggregate';

@Injectable()
export class GetClientsService
{
    constructor(
        private readonly repository: IClientRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<OAuthClient[]>
    {        
        return await this.repository.get(queryStatements);
    }
}