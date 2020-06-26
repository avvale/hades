import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetSystemsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}