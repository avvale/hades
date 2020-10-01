import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindDataLakeQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}