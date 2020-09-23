import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetPermissionsQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}