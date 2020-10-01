import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetExecutionsQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}