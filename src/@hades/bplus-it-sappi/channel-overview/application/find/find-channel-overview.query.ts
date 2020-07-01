import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindChannelOverviewQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}