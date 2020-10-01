import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetJobsDetailQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}