import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteFlowsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}