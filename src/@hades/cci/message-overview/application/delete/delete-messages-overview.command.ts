import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteMessagesOverviewCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}