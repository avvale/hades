import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindMessageDetailQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}