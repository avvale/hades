import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteClientsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}