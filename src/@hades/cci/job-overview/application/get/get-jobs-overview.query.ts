import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetJobsOverviewQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}