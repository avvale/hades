import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteContactsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}