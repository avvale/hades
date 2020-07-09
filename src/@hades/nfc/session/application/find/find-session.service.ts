import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISessionRepository } from './../../domain/session.repository';
import { NfcSession } from './../../domain/session.aggregate';

@Injectable()
export class FindSessionService
{
    constructor(
        private readonly repository: ISessionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<NfcSession>
    {        
        return await this.repository.find(queryStatements);
    }
}