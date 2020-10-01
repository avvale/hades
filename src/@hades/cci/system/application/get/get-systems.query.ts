import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetSystemsQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}