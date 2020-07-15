import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetMessagesDetailQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}