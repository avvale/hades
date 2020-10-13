import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteChannelsCommand 
{
    constructor(
        public queryStatement?: QueryStatement,
        public constraint?: QueryStatement,
    ) {}
}