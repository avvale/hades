import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetContactsQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}