import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class FindDataLakeQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}