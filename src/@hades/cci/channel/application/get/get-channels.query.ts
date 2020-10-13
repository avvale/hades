import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetChannelsQuery
{
    constructor(
        public queryStatement?: QueryStatement,
        public constraint?: QueryStatement,
    ) {}
}