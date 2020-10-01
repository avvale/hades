import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindRoleQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}