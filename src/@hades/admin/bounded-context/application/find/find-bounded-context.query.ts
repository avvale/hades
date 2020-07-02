import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindBoundedContextQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}