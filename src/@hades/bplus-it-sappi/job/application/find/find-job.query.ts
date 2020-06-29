import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindJobQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}