import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetExecutionsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}