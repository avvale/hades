import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteMessagesOverviewCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}