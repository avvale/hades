import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindChannelDetailQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}