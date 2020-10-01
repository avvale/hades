import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetChannelsDetailQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}