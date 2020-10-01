import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindJobOverviewQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}