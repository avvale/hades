import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteJobsOverviewCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}