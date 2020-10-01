import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetMessagesOverviewQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}