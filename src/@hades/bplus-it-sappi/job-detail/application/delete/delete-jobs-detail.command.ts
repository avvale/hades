import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteJobsDetailCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}