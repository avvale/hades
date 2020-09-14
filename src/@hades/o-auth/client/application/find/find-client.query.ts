import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindClientQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}