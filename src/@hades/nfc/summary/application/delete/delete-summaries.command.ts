import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteSummariesCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}