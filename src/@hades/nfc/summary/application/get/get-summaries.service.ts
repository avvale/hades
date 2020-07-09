import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISummaryRepository } from './../../domain/summary.repository';
import { NfcSummary } from './../../domain/summary.aggregate';

@Injectable()
export class GetSummariesService
{
    constructor(
        private readonly repository: ISummaryRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<NfcSummary[]>
    {        
        return await this.repository.get(queryStatements);
    }
}