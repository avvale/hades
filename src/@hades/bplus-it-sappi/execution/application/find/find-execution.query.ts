import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindExecutionQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}