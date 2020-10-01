import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindContactQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}