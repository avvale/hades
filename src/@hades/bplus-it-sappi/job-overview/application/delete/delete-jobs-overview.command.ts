import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteJobsOverviewCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}