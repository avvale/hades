import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeletePermissionsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}