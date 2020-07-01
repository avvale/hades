import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetMessagesOverviewQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}