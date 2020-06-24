import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteLangsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}