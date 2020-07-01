import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetChannelsOverviewQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}