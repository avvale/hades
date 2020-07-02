import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteRolesCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}