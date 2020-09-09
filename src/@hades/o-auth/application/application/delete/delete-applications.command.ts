import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteApplicationsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}