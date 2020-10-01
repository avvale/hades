import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindSystemQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}