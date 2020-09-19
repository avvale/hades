import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteApplicationsCommand 
{
    constructor(
        public queryStatement: QueryStatement
    ) {}
}