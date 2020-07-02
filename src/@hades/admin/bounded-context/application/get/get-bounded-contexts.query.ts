import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetBoundedContextsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}