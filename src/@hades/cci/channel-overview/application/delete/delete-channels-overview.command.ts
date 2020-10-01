import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteChannelsOverviewCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}