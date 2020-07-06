import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindChannelQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}