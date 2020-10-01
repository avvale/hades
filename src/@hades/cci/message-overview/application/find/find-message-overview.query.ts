import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindMessageOverviewQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}