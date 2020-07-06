import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteModulesCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}