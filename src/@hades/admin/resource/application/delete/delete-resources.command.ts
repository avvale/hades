import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteResourcesCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}