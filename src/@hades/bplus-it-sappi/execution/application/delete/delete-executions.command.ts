import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteExecutionsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}