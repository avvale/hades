import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindSessionQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}