import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteJobsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}