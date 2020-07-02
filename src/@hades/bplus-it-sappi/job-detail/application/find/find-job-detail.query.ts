import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindJobDetailQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}