import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteChannelsDetailCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}