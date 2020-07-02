import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteBoundedContextsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}