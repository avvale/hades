import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteJobsDetailCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}