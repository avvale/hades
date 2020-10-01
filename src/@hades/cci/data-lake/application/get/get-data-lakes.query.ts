import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetDataLakesQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}