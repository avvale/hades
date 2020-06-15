import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteLangCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}