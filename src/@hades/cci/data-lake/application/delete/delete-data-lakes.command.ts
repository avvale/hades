import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteDataLakesCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}