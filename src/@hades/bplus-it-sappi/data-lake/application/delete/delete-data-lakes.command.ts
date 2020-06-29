import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteDataLakesCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}