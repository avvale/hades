import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { ISummaryRepository } from './../../domain/summary.repository';
import { NfcSummary } from './../../domain/summary.aggregate';

@Injectable()
export class PaginateSummariesService
{
    constructor(
        private readonly repository: ISummaryRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<NfcSummary>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}