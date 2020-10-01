import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteMessagesDetailCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}