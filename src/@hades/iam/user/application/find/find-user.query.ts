import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindUserQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}