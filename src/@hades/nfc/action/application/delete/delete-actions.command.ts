import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteActionsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}