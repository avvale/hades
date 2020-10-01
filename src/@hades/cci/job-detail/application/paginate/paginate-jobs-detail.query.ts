import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class PaginateJobsDetailQuery
{
    constructor(
        public queryStatement?: QueryStatement,
        public constraint?: QueryStatement
    ) {}
}