import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteSystemsCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}