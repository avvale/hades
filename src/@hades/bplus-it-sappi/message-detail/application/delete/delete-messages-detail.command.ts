import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteMessagesDetailCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}