import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindTagQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}