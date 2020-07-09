import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { ISessionRepository } from './../../domain/session.repository';
import { NfcSession } from './../../domain/session.aggregate';

@Injectable()
export class PaginateSessionsService
{
    constructor(
        private readonly repository: ISessionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<NfcSession>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}