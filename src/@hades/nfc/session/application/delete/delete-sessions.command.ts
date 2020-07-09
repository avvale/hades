import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteSessionsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}