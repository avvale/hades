import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindApplicationQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}