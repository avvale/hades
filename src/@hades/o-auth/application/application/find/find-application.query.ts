import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindApplicationQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}