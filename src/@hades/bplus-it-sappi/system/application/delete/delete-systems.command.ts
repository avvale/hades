import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteSystemsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}