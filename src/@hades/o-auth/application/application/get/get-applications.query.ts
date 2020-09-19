import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetApplicationsQuery
{
    constructor(
        public queryStatement: QueryStatement
    ) {}
}