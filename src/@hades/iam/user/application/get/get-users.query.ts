import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetUsersQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}