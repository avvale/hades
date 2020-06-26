import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindSystemQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}